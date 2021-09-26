import { StatsService } from './../../services/stats/stats.service';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-matchups',
  templateUrl: './matchups.component.html',
  styleUrls: ['./matchups.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatchupsComponent implements OnInit {

  constructor(private statsService: StatsService) { }

  ngOnInit(): void {
    this.getStatsForWeek(4);
  }

  public async getStatsForWeek(week: number) {
    try {
      const results = await this.statsService.getGameStatsByWeek(week);

      console.log('RESULTS', results)
    } catch (error) {

    }
  }
}
