import { SquadsService } from './../../services/squads/squads.service';
import { AuthService } from './../../services/authentication/authentication.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
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
    this.getLoggedInUser();
  }

  public async getLoggedInUser() {
    if (!this.authService.userData.uid) {
      this.authService.isLoggedIn;
    }

    const user = await this.squadsService.getUserInformation(this.authService.userData.uid);
    this.league = (await this.squadsService.getLeagueByID(user.data()?.defaultLeague))?.data();

    this.cdf.detectChanges();
  }
}
