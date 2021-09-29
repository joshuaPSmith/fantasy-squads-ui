import { AuthService } from './../../services/authentication/authentication.service';
import { SquadsService } from './../../services/squads/squads.service';
import { Matchups } from './../../models/matchups.model';
import { getStatsForCurrentMatchup, getMatchUpValuesForTeams, week5, week4 } from './../../helper/matchups.helper';
import { StatsService } from './../../services/stats/stats.service';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-matchups',
  templateUrl: './matchups.component.html',
  styleUrls: ['./matchups.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatchupsComponent implements OnInit {
  private week4Matchup = [
    {
      squadUID: 'mLjGwubov66ji4fPIRSI',
      squads:
      [{ category: 'rushingTeam', team: 'Kent State', points: 0 },
      { category: 'passingTeam', team: 'Arkansas State', points: 0 },
      { category: 'defensiveTeam', team: 'Texas A&M', points: 0 }],
      matchupTotal: 0
    },
    {
      squadUID: 'EcdJ4qnzOVITIEJUPpyP',
      squads:
        [{ category: 'rushingTeam', team: 'Wisconsin', points: 0 },
        { category: 'passingTeam', team: 'Mississippi State', points: 0 },
        { category: 'defensiveTeam', team: 'Coastal Carolina', points: 0 }],
        matchupTotal: 0
    }
  ]

  public loading = false;
  public matchupResults: Array<Matchups> = [];
  public matchups: {
    week4: {
    week: string,
    matchups: {
      matchup1: Array<Matchups>
    },
    active: boolean,
    past: boolean,
  }} = {};

  constructor(
    private statsService: StatsService,
    private squadsService: SquadsService,
    private authService: AuthService,
    private cdf: ChangeDetectorRef ) { }

  ngOnInit(): void {
    this.getLoggedInUserInformation();
  }

  public async getStatsForWeek(week: number, weekMatchup: Array<Matchups>) {
    this.loading = true;
    try {
      const results = await this.statsService.getGameStatsByWeek(week);

      const matchupTeamStats = getStatsForCurrentMatchup(weekMatchup, results);

      // Now that we have the stats we need to calculate the scores
      this.matchupResults = getMatchUpValuesForTeams(weekMatchup, matchupTeamStats);

      // Set the name of the squads
      this.matchupResults.forEach(matchup => {
        // TODO: should I do this here?
        matchup.squads.forEach(squad => matchup.matchupTotal+= squad.points);
        matchup.squadName = this.squadsService.usersLeague.squads.find((squad: any) => squad.uid === matchup.squadUID).name
      })

    } catch (error) {
      console.error(error);
    }

    this.loading = false;
    this.cdf.detectChanges();
  }

  public async setMatchup() {
    try {
      await this.squadsService.setMatchup(week4, this.squadsService.usersLeague.uid)
    } catch (error) {
      console.error(error)
    }
  }

  public getStatsForMatchup(matchup) {
    
  }

  private async getLoggedInUserInformation() {
    if (!this.authService.userData.uid) {
      // confirm that the user is logged in
      this.authService.isLoggedIn;
    }

    try {
      const user = await this.squadsService.getUserInformation(this.authService.userData.uid);
      const league = await this.squadsService.getLeagueByID(user.data()?.defaultLeague);

      this.matchups = league?.matchups;

      console.log('##MATCHUPS##', this.matchups);
    } catch (error) {
      console.log('Error', error)
    }


    this.cdf.detectChanges();
  }
}
