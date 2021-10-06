import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarComponent implements OnInit {

  user: string = "Justin";
  userPhoto: string = "https://static.thenounproject.com/png/2112137-200.png";

  constructor() { }

  ngOnInit(): void {
  }

  imageIsPresent() {
    return this.userPhoto;
  }

}
