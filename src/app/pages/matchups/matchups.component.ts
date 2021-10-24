import { League, LoggedInUser, UsersSquad } from './../../models/league.model';
import { AuthService } from './../../services/authentication/authentication.service';
import { SquadsService } from './../../services/squads/squads.service';
import { Matchups, WeeklyMatchupInfo } from './../../models/matchups.model';
import { getStatsForCurrentMatchup, getMatchUpValuesForTeams, week5 } from './../../helper/matchups.helper';
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
  public squadNameMap: Map<string, string> = new Map();
  public user!: LoggedInUser;
  public usersSquad!: UsersSquad;
  public teamListForSelect: Array<string> = [];

  public categoryTeamDefinition = {
    rushingTeam: 'Rushing Team',
    passingTeam: 'Passing Team',
    defensiveTeam: 'Defensive Team'
  }

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

    // this.leagueWeeklyMatchups.push(week5);

    this.leagueWeeklyMatchups.forEach(weeklyMatchup => {
      if (weeklyMatchup.past) {
        // This has already happened. Lets get the results
        this.getStatsForWeek(weeklyMatchup.week, weeklyMatchup.squadMatchups);
      }
    })

    this.squadsService.usersLeague.squads.forEach((squad: UsersSquad) => {
      // Create map
      this.squadNameMap.set(squad.uid, squad.name)

      // Get the logged in users squad
      if (squad.ownerID === this.user.uid) {
        this.usersSquad = squad;

        // Set the list
        this.teamListForSelect = [...this.usersSquad.teamsList]
      }
    });

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

        // Compute the total points
        computedResults.forEach(matchup => {
          matchup.selectedSquads.forEach(squad => matchup.matchupTotal += squad.points);
        })

        return computedResults;
      })

    } catch (error) {
      console.error(error);
    }
  }

  public selectionChange(selectedTeam: string, category: string) {
    // TODO: I need to make the option disabled in the other fields
    // this.teamListForSelect = this.teamListForSelect.filter(team => team !== selectedTeam)
    console.log('Team', selectedTeam, category)
  }

  // TODO remove this later. Just using as a helper now
  public async setMatchup() {
    try {
      await this.squadsService.setMatchup(this.leagueWeeklyMatchups, 'k08dC6ulgR9xrwH77A0h')
    } catch (error) {
      console.error(error)
    }
  }

  private async getLoggedInUserLeague(): Promise<League> {
    if (!this.authService.userData.uid) {
      // confirm that the user is logged in
      this.authService.isLoggedIn;
    }

    try {
      this.user = await this.squadsService.getUserInformation(this.authService.userData.uid);
      const league = await this.squadsService.getLeagueByID(this.user.defaultLeague);

      return league;

    } catch (error) {
      throw Error((error as Error).message)
    }
  }
}
