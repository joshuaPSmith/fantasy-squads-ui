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
        const callable = this.fireFunctions.httpsCallable('getGameStatsByWeek2');
        try {
            return callable({week: week}).toPromise();

        } catch (error) {
            console.error(error);
        }
    }

    public async getAllRecords() {
        const callable = this.fireFunctions.httpsCallable('getAllTeamRecords');
        try {
            return callable({}).toPromise();

        } catch (error) {
            console.error(error);
        }
    }

}
