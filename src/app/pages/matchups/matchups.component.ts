import { AuthService } from './../../services/authentication/authentication.service';
import { SquadsService } from './../../services/squads/squads.service';
import { Matchups, WeeklyMatchupInfo } from './../../models/matchups.model';
import { getStatsForCurrentMatchup, getMatchUpValuesForTeams } from './../../helper/matchups.helper';
import { StatsService } from './../../services/stats/stats.service';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-matchups',
  templateUrl: './matchups.component.html',
  styleUrls: ['./matchups.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatchupsComponent implements OnInit {
  public loading = false;
  public matchupResults: Array<Matchups> = [];
  public leagueWeeklyMatchups: Array<WeeklyMatchupInfo> = [];
  // public matchups: Array< WeeklyMatchupInfo> = [
  //   {
  //     week: 4,
  //     active: false,
  //     past: true,
  //     squadMatchups: [{weeklyMatchup: this.week4Matchup}]
  //   },
  //   week5
  // ];

  constructor(
    private statsService: StatsService,
    private squadsService: SquadsService,
    private authService: AuthService,
    private cdf: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.initContainer();
  }

  public async initContainer() {
    this.loading = true;
    const league = await this.getLoggedInUserLeague();
    this.leagueWeeklyMatchups = league?.matchups;

    this.leagueWeeklyMatchups.forEach(weeklyMatchup => {
      if (weeklyMatchup.past) {
        // This has already happened. Lets get the results
        this.getStatsForWeek(weeklyMatchup.week, weeklyMatchup.squadMatchups);
      } else {
        // Set the names for each one
        weeklyMatchup.squadMatchups.forEach(matchup => {
          matchup.weeklyMatchup.forEach(squad => squad.squadName = this.squadsService.usersLeague.squads.find((squad: any) => squad.uid === squad.squadUID)?.name)
        })
      }
    })

    this.loading = false;
    this.cdf.detectChanges();
  }

  public async getStatsForWeek(week: number, weeklyMatchups: Array<{ weeklyMatchup: Array<Matchups> }>) {
    try {
      const results = (await this.statsService.getGameStatsByWeek(week)).result;

      // TODO This is something I need to look at. Its updating the object for me.
      // Its very possible this is not needed anyways in the UI and should be on the API
      const test = weeklyMatchups.map(matchups => {
        // work through each one
        const matchupTeamStats = getStatsForCurrentMatchup(matchups.weeklyMatchup, results);

        // Now that we have the stats we need to calculate the scores
        let computedResults = getMatchUpValuesForTeams(matchups.weeklyMatchup, matchupTeamStats);

        // Set the name of the squads
        computedResults.forEach(matchup => {
          matchup.selectedSquads.forEach(squad => matchup.matchupTotal += squad.points);

          // TODO: I should just create an object here that can use the ID to show a name
          matchup.squadName = this.squadsService.usersLeague.squads.find((squad: any) => squad.uid === matchup.squadUID)?.name
        })

        return computedResults;
      })

    } catch (error) {
      console.error(error);
    }
  }

  public async setMatchup() {
    try {
      await this.squadsService.setMatchup(this.leagueWeeklyMatchups, 'k08dC6ulgR9xrwH77A0h')
    } catch (error) {
      console.error(error)
    }
  }

  private async getLoggedInUserLeague() {
    if (!this.authService.userData.uid) {
      // confirm that the user is logged in
      this.authService.isLoggedIn;
    }

    try {
      const user = await this.squadsService.getUserInformation(this.authService.userData.uid);
      const league = await this.squadsService.getLeagueByID(user.data()?.defaultLeague);

      return league;

    } catch (error) {
      console.log('Error', error)
    }
  }
}
