import { pruneRecords, calculateSquadWins } from './../../helper/records.helper';
import { SquadsService } from './../../services/squads/squads.service';
import { pruneStats, rankSquads, rankSquadsPerCategory, getSquadStandings, SquadRankByCategory, SquadStandingsRank, DetailedSquads } from './../../helper/stats.helper';
import Squad from 'src/app/models/squad.model';
import { StatsService } from './../../services/stats/stats.service';
import { ChangeDetectorRef, Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-squad-rankings',
  templateUrl: './squad-rankings.component.html',
  styleUrls: ['./squad-rankings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SquadRankingsComponent implements OnInit {
  public squads?: Squad[];
  public squadStats: DetailedSquads[] = [];
  public squadRankings: SquadRankByCategory[] = [];
  public squadStandings: SquadStandingsRank[] = [];

  public statsVisible = false;
  public rankingsVisible = false;
  public winsCalculated = false;
  public loadingData = false;
  public step = 0;

  public categoryEnum: any = {
    'totalYards': 'Total Yards',
    'thirdDownConversions': 'Third Down Conversions',
    'puntReturnYards': 'Punt Return Yards',
    'sacks': 'Sacks',
    'fumblesRecovered': 'Fumbles Recovered',
    'netPassingYards': 'Net Passing Yards',
    'rushingYards': 'Rushing Yards',
    'turnovers': 'Turnovers',
    'passesIntercepted': 'Passes Intercepted',
    'rushingTDs': 'Rushing TDs',
    'passingTDs': 'Passing TDs'
  }
  constructor(
    private statsService: StatsService,
    private squadsService: SquadsService,
    private snackBar: MatSnackBar,
    private cdf: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.retrieveSquads();
  }

  public retrieveSquads(): void {
    this.loadingData = true;
    this.cdf.detectChanges();
    this.squadsService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map((c: { payload: { doc: { id: any; data: () => any; }; }; }) =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe((data: Squad[] | undefined) => {
      this.squads = data;
      this.step = 1;
      this.loadingData = false;
      this.cdf.detectChanges();
    });
  }

  public async getStats() {
    this.loadingData = true;
    this.cdf.detectChanges();
    // I should have the teams now but need to confirm that

    try {
      // Get raw stats
      const allTeamStats = await this.statsService.getALLStats();

      const prunedStats = pruneStats(allTeamStats, this.squads as Squad[])


      this.squadStats = Object.values(rankSquads(prunedStats, this.squads as Squad[]));

      this.statsVisible = true;
      this.rankingsVisible = false;
      this.step = 2;
    } catch (error) {
      this.snackBar.open('Sorry looks like something is not loading', 'close');
    }

    this.loadingData = false;
    this.cdf.detectChanges();
  }

  public getRankings() {
    this.loadingData = true;
    this.cdf.detectChanges();
    // TODO do a better job with the types. Its easier to display arrays
    this.squadRankings = rankSquadsPerCategory(Object.values(this.squadStats));

    this.rankingsVisible = true;
    this.statsVisible = false;
    this.loadingData = false;
    this.cdf.detectChanges();
  }

  public getStandings() {
    this.loadingData = true;
    this.cdf.detectChanges();

    this.squadStandings = getSquadStandings(this.squadRankings);
    this.rankingsVisible = false;

    this.loadingData = false;
    this.cdf.detectChanges();
  }

  public async getRecords() {
    this.loadingData = true;
    this.cdf.detectChanges();

    const allRecords = await this.statsService.getAllRecords();

    const prunedRecords = pruneRecords(allRecords.result, this.squads as Squad[]);

    const squadWins = calculateSquadWins(prunedRecords, this.squads as Squad[]);

    this.squads?.forEach(squad => squad.winPoints = squadWins.get(squad.name))

    this.winsCalculated = true;
    this.loadingData = false;
    this.cdf.detectChanges();
  }

}
