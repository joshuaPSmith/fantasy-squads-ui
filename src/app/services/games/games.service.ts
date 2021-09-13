import { AngularFireFunctions } from '@angular/fire/functions';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor(private fireFunctions: AngularFireFunctions) { }

  public async geAllGames() {
    const callable = this.fireFunctions.httpsCallable('getAllGames');
    try {
        const allGames = callable({}).toPromise();
        console.log('games', allGames);
    } catch (error) {
        console.error(error);
    }
}
}
