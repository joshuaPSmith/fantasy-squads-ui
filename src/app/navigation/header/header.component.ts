import { Component, OnInit, Output, EventEmitter } from '@angular/core';
//import { AuthService } from './services/authentication/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() public sidenavToggle = new EventEmitter();

  public menuList = [
    {
      title: 'Squads',
      href:'squads'
    },
    {
      title: 'Rankings',
      href:'rankings'
    },
    {
      title: 'Games',
      href:'games'
    }
  ]
    //constructor(public authService: AuthService) {}
  title = 'Squad Blitz!';

  ngOnInit() {
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

}
