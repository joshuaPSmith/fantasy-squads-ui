import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { User } from 'src/app/services/authentication/authentication.service';
import { SquadsService } from 'src/app/services/squads/squads.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfileComponent implements OnInit {

  user: string = "Justin";
  userPhoto: string = "https://static.thenounproject.com/png/2112137-200.png";

  constructor() { }

  ngOnInit(): void {
  }

  imageIsPresent() {
    return this.userPhoto;
  }

}
