import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  @Output() sidenavClose = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }
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


}
