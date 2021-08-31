import { pruneStats, rankSquads, rankSquadsPerCategory } from './../../helper/stats.helper';
import Squad from 'src/app/models/squad.model';
import { StatsService } from './../../services/stats/stats.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-squad-rankings',
  templateUrl: './squad-rankings.component.html',
  styleUrls: ['./squad-rankings.component.css']
})
export class SquadRankingsComponent implements OnInit {
 public squads?: Squad[];
 public squadStats: any;
 public squadRankings: any;
 public statsVisible = false;
 public rankingsVisible = false;
 public loadingData = false;
 public step = 0;

  constructor(private statsService: StatsService) { }

  ngOnInit(): void {
    this.retrieveSquads();
  }

  public retrieveSquads(): void {
    this.loadingData = true;
    this.statsService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map((c: { payload: { doc: { id: any; data: () => any; }; }; }) =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe((data: Squad[] | undefined) => {
      this.squads = data;
      this.step = 1;
      this.loadingData = false;
    });
  }

  public async getStats() {
    this.loadingData = true;
    // I should have the teams now but need to confirm that

    // Get raw stats
    // const allTeamStats = await this.statsService.getTeamStats('');
    const allTeamStats = await this.statsService.getALLStats();

    const prunedStats = pruneStats(allTeamStats, this.squads as Squad[])


    this.squadStats = Object.values(rankSquads(prunedStats, this.squads as Squad[]));
    this.statsVisible = true;
    this.rankingsVisible = false;
    this.step = 2;
    this.loadingData = false;
  }

  public getRankings() {
    this.loadingData = true;
    // TODO do a better job with the types. Its easier to display arrays 
    this.squadRankings = rankSquadsPerCategory(Object.values(this.squadStats));

    this.rankingsVisible = true;
    this.statsVisible = false;
    this.loadingData = false;
  }

}
