import { AuthService } from './../../services/authentication/authentication.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
//import { AuthService } from './services/authentication/authentication.service';
import { MenuList } from 'src/app/models/navigation';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() public sidenavToggle = new EventEmitter();

  public menuList = MenuList;

  constructor(public authService: AuthService) {}

  title = 'Squad Blitz!';

  ngOnInit() {
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

}
