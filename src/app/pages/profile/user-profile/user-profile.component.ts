import { Component, OnInit, ChangeDetectionStrategy, Directive } from '@angular/core';
import { User } from 'src/app/services/authentication/authentication.service';
import { SquadsService } from 'src/app/services/squads/squads.service';
import { AvatarComponent } from 'src/app/components/avatar/avatar.component';
import { LoggedInUser } from 'src/app/models/league.model';
import { AuthService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfileComponent implements OnInit {

  public user!: LoggedInUser;

  //Sets the avatar styling to use the user-profile CSS class
  public avatarSpot = 'user profile'


  constructor(
    private squadsService: SquadsService,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    this.initContainer();
  }

  public async initContainer() {
    const userPhotoLink = (await this.getLoggedInUserInfo()).photoLink;
    const userDisplayName = (await this.getLoggedInUserInfo()).name;
  }

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
}
