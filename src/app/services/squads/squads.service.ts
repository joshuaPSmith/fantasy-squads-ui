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
  private dbPath = '/squads';

  squadsRef: AngularFirestoreCollection<Squad[]>;

  constructor(private db: AngularFirestore, private fireFunctions: AngularFireFunctions, private http: HttpClient) {
      this.squadsRef = db.collection(this.dbPath);
  }

  public getAll(): AngularFirestoreCollection<Squad[]> {
    return this.squadsRef;
}

// public getAllAsPromise(): any {
//     return this.db.collection(this.dbPath).get().toPromise();
// }
}
