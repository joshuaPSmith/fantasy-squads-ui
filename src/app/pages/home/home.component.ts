import { SquadsService } from './../../services/squads/squads.service';
import { AuthService } from './../../services/authentication/authentication.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public menuList = [
    {
      title: 'Squads',
      href: 'squads'
    },
    {
      title: 'Rankings',
      href: 'rankings'
    },
    {
      title: 'Games',
      href: 'games'
    }
  ];

  public league: any;
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
      this.league = await this.squadsService.getLeagueByID(user.data()?.defaultLeague);
    } catch (error) {
      console.log('Error', error)
    }


    this.cdf.detectChanges();
  }
}
