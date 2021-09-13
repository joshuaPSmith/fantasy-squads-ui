import { StandingsComponent } from './components/standings/standings.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SquadsListComponent } from './components/squads-list/squads-list.component';
import { SquadRankingsComponent } from './components/squad-rankings/squad-rankings.component';

const routes: Routes = [
  { path: '', redirectTo: 'squads', pathMatch: 'full' },
  { path: 'squads', component: SquadsListComponent },
  { path: 'standings', component: StandingsComponent },
  { path: 'rankings', component: SquadRankingsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
