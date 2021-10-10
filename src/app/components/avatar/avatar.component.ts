import { Component, OnInit, ChangeDetectionStrategy, Input, Output } from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarComponent implements OnInit {

  @Input()
  photoLink: string | undefined = ''

  @Input() spot: string | undefined

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Determines whether the logged in user has a profile image.
   * If so, that image is displayed.
   * If not, a generic icon is displayed
   * TODO: Get a better user-has-no-image pic
   */
  imageIsPresent() {
    if (this.photoLink) {
      return true
    } else {
      return false
    }
  }

  //Gets the location of the Avatar
  public classBasedOnLocation() {
    const spot = this.spot
    return this.avatarImageClass(spot);
  }

  //Changes the CSS style based on the location of the Avatar
  public avatarImageClass(location?: string) {
    if (location === 'user profile') {
      return 'isSquare'
    } else if (location === 'header') {
      return 'isRound'
    } else {
      return 'avatar'
    }
  }
}
