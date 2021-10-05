import { League } from './../../models/league.model';
import { SquadsService } from './../../services/squads/squads.service';
import { AuthService } from './../../services/authentication/authentication.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // TODO: Should I just use a class here?
  public league: League = {
    uid: '',
    leagueName: '',
    squads: [],
    users: [],
    matchups: []
  };
  public title = 'Squad Blitz!';

  constructor(
    public authService: AuthService,
    private squadsService: SquadsService,
    private cdf: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getLoggedInUserInformation();
  }

  public async getLoggedInUserInformation() {
    if (!this.authService.userData.uid) {
      // confirm that the user is logged in
      this.authService.isLoggedIn;
    }

    try {
      const user = await this.squadsService.getUserInformation(this.authService.userData.uid);
      this.league = await this.squadsService.getLeagueByID(user.defaultLeague);
    } catch (error) {
      console.log('Error', error)
    }

    this.cdf.detectChanges();
  }
}
