import { AngularFireFunctions } from '@angular/fire/functions';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  public allGamesState = [];

  constructor(private fireFunctions: AngularFireFunctions) { }

  public async geAllGames() {
    // See if we already have the games
    if (this.allGamesState.length) {
      return this.allGamesState;
    } else {
      const callable = this.fireFunctions.httpsCallable('getAllGames');
      try {
          const allGames = callable({}).toPromise();
          
          return allGames;
      } catch (error) {
          console.error(error);
      }
    }
}
}
