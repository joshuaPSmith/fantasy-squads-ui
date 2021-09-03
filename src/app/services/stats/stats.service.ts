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
export class StatsService {
    private dbPath = '/squads';

    squadsRef: AngularFirestoreCollection<Squad[]>;

    constructor(private db: AngularFirestore, private fireFunctions: AngularFireFunctions, private http: HttpClient) {
        this.squadsRef = db.collection(this.dbPath);
    }

    public async getStats() {
        const callable = this.fireFunctions.httpsCallable('getGames');
        try {
            const teams = callable({}).toPromise();
            console.log('teams', teams);
        } catch (error) {
            console.error(error);
        }
    }

    public async getALLStats() {
        const callable = this.fireFunctions.httpsCallable('getAllStats');
        try {
            return callable({}).toPromise();
            
        } catch (error) {
            console.error(error);
        }
    }

    public getAll(): AngularFirestoreCollection<Squad[]> {
        return this.squadsRef;
    }

    public getAllAsPromise(): any {
        return this.db.collection(this.dbPath).get().toPromise();
    }

    public async getTeamStats(team: string): Promise<any> {
        let currentSquads = null;
        this.squadsRef.snapshotChanges().pipe(take(1),).subscribe(squadArray => {
            currentSquads = squadArray.map(squad => {
                return {
                    id: squad.payload.doc.id,
                    ...squad.payload.doc.data()
                } as unknown as Squad
              })

        })
        // const currentSquads = await this.getAllAsPromise();
        

        // const prunnedStats = pruneStats(teamStats, currentSquads)
        // return Promise.resolve(prunnedStats);
        return Promise.resolve(teamStats);
    }
}
