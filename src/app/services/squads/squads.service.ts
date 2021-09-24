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
  public usersLeague: any = {
    loaded: false
  }

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

public async getLeagueByID(id: string) {
  if (this.usersLeague.loaded) {
    return this.usersLeague;
  }

  try {
    const league = (await this.leaguesCollection.doc(`${id}`).get().toPromise()).data();
    this.usersLeague = {...league, loaded: true}

    return this.usersLeague;
  } catch (error) {
    throw Error((error as Error).message)
  }

}

}
