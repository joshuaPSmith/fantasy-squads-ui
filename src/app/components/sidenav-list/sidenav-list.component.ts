import { AuthService } from './../../services/authentication/authentication.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MenuList } from 'src/app/models/navigation';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  @Output() sidenavClose = new EventEmitter();

  ngOnInit() {
  }

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }

  public menuList = MenuList;

  constructor(public authService: AuthService) {}
  title = 'Squad Blitz!';


}
