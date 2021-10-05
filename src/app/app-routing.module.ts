import { MatchupsComponent } from './pages/matchups/matchups.component';
import { LoggedInGuard } from './guards/logged-in.guard';
import { HomeComponent } from './pages/home/home.component';
import { SquadGamesComponent } from './components/squad-games/squad-games.component';
import { AuthGuard } from './guards/auth.guard';
import { VerifyEmailComponent } from './components/authentication/verify-email/verify-email.component';
import { ForgotPasswordComponent } from './components/authentication/forgot-password/forgot-password.component';
import { SignUpComponent } from './components/authentication/sign-up/sign-up.component';
import { SignInComponent } from './components/authentication/sign-in/sign-in.component';
import { StandingsComponent } from './components/standings/standings.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SquadsListComponent } from './components/squads-list/squads-list.component';
import { SquadRankingsComponent } from './components/squad-rankings/squad-rankings.component';

const routes: Routes = [
  { path: 'sign-in', component: SignInComponent, canActivate: [LoggedInGuard] },
  { path: 'register-user', component: SignUpComponent, canActivate: [LoggedInGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [LoggedInGuard] },
  { path: 'verify-email-address', component: VerifyEmailComponent, canActivate: [LoggedInGuard] },
  {
    path: '', component: HomeComponent, canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: '/games', pathMatch: 'full' },
      { path: 'squads', component: SquadsListComponent },
      { path: 'standings', component: StandingsComponent },
      { path: 'rankings', component: SquadRankingsComponent },
      { path: 'games', component: SquadGamesComponent },
      { path: 'matchups', component: MatchupsComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
