import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from './../services/authentication/authentication.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LoggedInGuard implements CanActivate {

  constructor(
    public authService: AuthService,
    public router: Router,
    private snackBar: MatSnackBar
  ){ }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this.authService.isLoggedIn === true) {
      this.router.navigate(['']);
      this.snackBar.open('Already Logged In!', 'Dismiss', {duration: 2500});
    }
    return true;
  }

}
