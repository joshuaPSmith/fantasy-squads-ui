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

  squadsRef: AngularFirestoreCollection<Squad[]>;

  constructor(private db: AngularFirestore, private fireFunctions: AngularFireFunctions, private http: HttpClient) {
      this.squadsRef = db.collection(this.squadsDBPath);
      this.usersCollection = this.db.collection(this.usersDBPath);
      this.leaguesCollection = this.db.collection(this.leauguesDBPath);


  }

  public getAll(): AngularFirestoreCollection<Squad[]> {
    return this.squadsRef;
}

public getUserInformation(id: string) {
  return this.usersCollection.doc(`${id}`).get().toPromise();
}

public getLeagueByID(id: string) {
  return this.leaguesCollection.doc(`${id}`).get().toPromise();
}

public update(test: any, id: any) {
  return this.leaguesCollection.doc(`${id}`).update(test);
}
}
