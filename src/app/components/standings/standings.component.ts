import { GamesService } from './../../services/games/games.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.scss']
})
export class StandingsComponent {

  constructor(gamesService: GamesService) { }

  // public async getGames() {
  //   const allGames = await this.gamesService.geAllGames();

  //   const squads = 
  // }
}
