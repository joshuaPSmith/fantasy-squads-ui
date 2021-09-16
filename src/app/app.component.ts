import { AuthService } from './services/authentication/authentication.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
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
  constructor(public authService: AuthService) {}
  title = 'Fantasy Squads!';
}
