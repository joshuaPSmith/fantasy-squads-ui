import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';


@Injectable({
    providedIn: 'root'
})
export class StatsService {
    constructor(private fireFunctions: AngularFireFunctions) {}

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

    public async getGameStatsByWeek(week: number) {
        const callable = this.fireFunctions.httpsCallable('getGameStatsByWeek');
        try {
            return callable({week: week}).toPromise();

        } catch (error) {
            console.error(error);
        }
    }

    // public getAllAsPromise(): any {
    //     return this.db.collection(this.dbPath).get().toPromise();
    // }

    // public async getTeamStats(team: string): Promise<any> {
    //     let currentSquads = null;
    //     this.squadsRef.snapshotChanges().pipe(take(1),).subscribe(squadArray => {
    //         currentSquads = squadArray.map(squad => {
    //             return {
    //                 id: squad.payload.doc.id,
    //                 ...squad.payload.doc.data()
    //             } as unknown as Squad
    //           })

    //     })
    //     return Promise.resolve(teamStats);
    // }
}
