import { AuthService } from './../../services/authentication/authentication.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MenuList } from 'src/app/models/navigation';
import { SquadsService } from 'src/app/services/squads/squads.service';
import { LoggedInUser } from 'src/app/models/league.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  @Output() public sidenavToggle = new EventEmitter();

  public menuList = MenuList;
  public user!: LoggedInUser;

  //Sets the avatar styling to use the header CSS class
  public avatarSpot = 'header'

  constructor(
    public authService: AuthService,
    public squadsService: SquadsService
    ) {}

  title = 'Squad Blitz!';

  ngOnInit(): void {
    this.initContainer();
  }

  public async initContainer() {
    const userPhotoLink = (await this.getLoggedInUserInfo()).photoLink;
    const userDisplayName = (await this.getLoggedInUserInfo()).name;
  }

  //Gets user profile information
  public async getLoggedInUserInfo() {
    if (!this.authService.userData.uid) {
        // confirm that the user is logged in
        this.authService.isLoggedIn;
      }

    try {
      this.user = await this.squadsService.getUserInformation(this.authService.userData.uid);
      const userInfo = {
        name: this.user.displayName,
        photoLink: this.user.photoURL
      }

      return userInfo;

    } catch (error) {
      throw Error((error as Error).message)
    }
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }
}


