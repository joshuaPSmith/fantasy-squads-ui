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
  { path: '', redirectTo: '/squads', pathMatch: 'full'},
  { path: 'sign-in', component: SignInComponent},
  { path: 'register-user', component: SignUpComponent},
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent },
  { path: 'squads', component: SquadsListComponent, canActivate: [AuthGuard] },
  { path: 'standings', component: StandingsComponent, canActivate: [AuthGuard] },
  { path: 'rankings', component: SquadRankingsComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
