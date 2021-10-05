import { League, LoggedInUser } from './../../models/league.model';
import Squad from '../../models/squad.model';
import { teamStats } from './../../../assets/teamStats';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SquadsService {
  private squadsDBPath = '/squads';
  private usersDBPath = '/users';
  private leauguesDBPath = '/leagues';

  private usersCollection: AngularFirestoreCollection;
  private leaguesCollection: AngularFirestoreCollection;
  private squadsRef: AngularFirestoreCollection<Squad[]>;

  public usersSquad: Squad | null = null;
  public usersLeague: League = {
    uid: '',
    leagueName: '',
    squads: [],
    users: [],
    matchups: []
  };

  public loggedInUser: LoggedInUser = {
    uid: '',
    email: '',
    defaultLeague: '',
    displayName: '',
    emailVerified: false
  }

  constructor(private db: AngularFirestore, private fireFunctions: AngularFireFunctions, private http: HttpClient) {
      this.squadsRef = db.collection(this.squadsDBPath);
      this.usersCollection = this.db.collection(this.usersDBPath);
      this.leaguesCollection = this.db.collection(this.leauguesDBPath);


  }

  public getAll(): AngularFirestoreCollection<Squad[]> {
    return this.squadsRef;
}

// TODO: Maybe I want to use a getter here? I really just want to use the property above
public async getUserInformation(id: string) {
  if (this.loggedInUser.email) {
    return this.loggedInUser
  }

  try {
    const user = (await this.usersCollection.doc(`${id}`).get().toPromise()).data();

    this.loggedInUser = user as LoggedInUser;

    return this.loggedInUser;
  } catch (error) {
    throw Error((error as Error).message)
  }
}

public async getLeagueByID(id: string): Promise<League> {
  if (this.usersLeague.uid) {
    return this.usersLeague;
  }

  try {
    const league = (await this.leaguesCollection.doc(`${id}`).get().toPromise()).data();
    this.usersLeague = (league as League);

    return this.usersLeague;
  } catch (error) {
    throw Error((error as Error).message)
  }

}

public async setMatchup(weeklyMatchup: any, leagueID: string) {
  try {
    return await this.leaguesCollection.doc(leagueID).update({'matchups': weeklyMatchup});
  } catch (error) {
    throw Error((error as Error).message)
  }
}

}
