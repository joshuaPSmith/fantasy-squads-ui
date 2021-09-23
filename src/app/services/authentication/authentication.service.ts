import { Injectable, NgZone } from '@angular/core';
import auth from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
  defaultLeague?: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public userData: User = {
    uid: '',
    email: '',
    displayName: '',
    photoURL: '',
    defaultLeague: '',
    emailVerified: false
  };

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    /* Saving user data in localstorage when
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user') as any);
      } else {
        localStorage.setItem('user', null as any);
        JSON.parse(localStorage.getItem('user') as any);
      }
    })
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const localStorageValue = localStorage.getItem('user') as any
    if (localStorageValue && localStorageValue !== 'null') {
      // set the user obect if its not there
      if (!this.userData.displayName) {
        this.setUserData(JSON.parse(localStorageValue));

        const parsedUser = JSON.parse(localStorageValue)
        this.userData = {
          uid: parsedUser.uid,
          email: parsedUser.email,
          displayName: parsedUser.displayName,
          photoURL: parsedUser.photoURL,
          emailVerified: parsedUser.emailVerified
        }
      }


      return true
    } else {

      return false;
    }
    // return (user !== null && user?.emailVerified !== false) ? true : false;
  }

  // Sign in with email/password
  public async signIn(email: string, password: string) {
    const loggedIn: any = await this.afAuth.signInWithEmailAndPassword(email, password);
    this.setUserData(loggedIn.user);

    this.router.navigate(['']);
    try {

    } catch (error: any) {
      window.alert(error.message)
    }
  }

  // Sign up with email/password
  public signUp(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result: any) => {
        /* Call the SendVerificaitonMail() function when new user sign
        up and returns promise */
        this.sendVerificationMail();
        this.setUserData(result.user);
      }).catch((error: Error) => {
        window.alert(error.message)
      })
  }

  // Send email verfificaiton when new user sign up
  public sendVerificationMail() {
    return this.afAuth.currentUser.then((user: any) => user.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email-address']);
      })
  }

  // Reset Forggot password
  public forgotPassword(passwordResetEmail: string) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      }).catch((error: Error) => {
        window.alert(error)
      })
  }

  // Sign in with Google
  public googleAuth() {
    // firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
    return this.authLogin(new auth.auth.GoogleAuthProvider());
  }

  // Sign out
  public signOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    })
  }

  /* Setting up user data when sign in with username/password,
sign up with username/password and sign in with social auth
provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  private async setUserData(user: User) {
    const userRef: AngularFirestoreDocument<any> = await this.afs.doc(`users/${user.uid}`);

    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  // Auth logic to run auth providers
  private async authLogin(provider: any) {

    try {
      const authLoginResult = await this.afAuth.signInWithPopup(provider);

      await this.setUserData((authLoginResult as any).user);
      this.router.navigate(['']);
    } catch (error) {
      window.alert(error)
    }
    return this.afAuth.signInWithPopup(provider)
      .then((result: any) => {

      }).catch((error) => {

      })
  }
}
