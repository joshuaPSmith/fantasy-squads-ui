import Squad from '../../models/squad.model';
import { createTeamsMap } from './../../helper/stats.helper';
import { map } from 'rxjs/operators';
import { SquadsService } from './../../services/squads/squads.service';
import { pruneGames, getGamesPerSquad, GameInformation, getGamesPerWeek } from './../../helper/games.helper';
import { GamesService } from './../../services/games/games.service';
import { ChangeDetectorRef, Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-squad-games',
  templateUrl: './squad-games.component.html',
  styleUrls: ['./squad-games.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SquadGamesComponent implements OnInit {

  public loadingData = false;
  public squads: any = [];
  public prunnedGames: GameInformation[] = [];
  public displayedColumns: string[] = [
    "week",
    "homeTeam",
    "homePoints",
    "awayTeam",
    "awayPoints"
  ];
  public currentSquadGames: GameInformation[] = [];
  public gamesToShowTable: GameInformation[] = [];
  public weeks = [...Array(13).keys()].map(i => i + 1);
  public selectedWeek = "all";
  @ViewChild(MatTable) public table: MatTable<GameInformation> | undefined;


  constructor(
    private gamesService: GamesService,
    private squadsService: SquadsService,
    private snackBar: MatSnackBar,
    private cdf: ChangeDetectorRef
    ) { }

  ngOnInit(): void {
    this.retrieveSquads();
  }

  public retrieveSquads(): void {
    this.loadingData = true;
    this.squadsService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map((c: { payload: { doc: { id: any; data: () => any; }; }; }) =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe((data: Squad[]) => {
      this.squads = data;
      this.getGames();
    });
  }

  public async getGames() {
    this.loadingData = true;
    try {
      const rawGames = await this.gamesService.geAllGames();

      this.prunnedGames = pruneGames(rawGames, createTeamsMap(this.squads));
    } catch (error) {
      this.snackBar.open('Something didnt load correctly', 'close');
    }


    this.loadingData = false;
    this.cdf.detectChanges();
  }

  public getGamesForSquad(squadName: string) {
    // get the games for this team
    this.currentSquadGames = getGamesPerSquad(this.prunnedGames, squadName)

    // Set this to the table value
    this.gamesToShowTable = this.currentSquadGames;

    // reset the dropdown
    this.selectedWeek = 'all';

    // rerender table
    this.table?.renderRows();
  }

  public filterGamesByWeek(week: number) {
    // filter the games for the selected week
    this.gamesToShowTable = getGamesPerWeek(this.currentSquadGames, week);

    // rerender the table
    this.table?.renderRows();
  }

  public showAllWeeks() {
    // reset all of the games
    this.gamesToShowTable = this.currentSquadGames;

    // rerender table
    this.table?.renderRows();
  }

}
