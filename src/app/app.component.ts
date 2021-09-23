import { map } from 'rxjs/operators';
import { SquadsService } from './services/squads/squads.service';
import { AuthService } from './services/authentication/authentication.service';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
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
  public squads: any;

  constructor(public authService: AuthService, private squadsService: SquadsService, private cdf: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getLoggedInUser();
    this.retrieveSquads();
  }

  public async getLoggedInUser() {
    if (!this.authService.userData.uid) {
      this.authService.isLoggedIn;
    }

    const user = await this.squadsService.getUserInformation(this.authService.userData.uid);
    this.league = (await this.squadsService.getLeagueByID(user.data()?.defaultLeague))?.data();

    this.cdf.detectChanges();
  }

  retrieveSquads(): void {
    this.squadsService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map((c: { payload: { doc: { id: any; data: () => any; }; }; }) =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe((data: any[] | undefined) => {
      this.squads = data?.map(data => {return {...data, uid: data.id}});
      console.log('**SQUADS**', this.squads)
    });
  }

  public async update() {
    const test = await this.squadsService.update({squads: this.squads}, this.league.uid);
    console.log('##TEST##', test);
  }
}
