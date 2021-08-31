import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SquadsListComponent } from './components/squads-list/squads-list.component';
import { SquadRankingsComponent } from './components/squad-rankings/squad-rankings.component';

import { AddTutorialComponent } from './components/add-tutorial/add-tutorial.component';

const routes: Routes = [
  { path: '', redirectTo: 'squads', pathMatch: 'full' },
  { path: 'squads', component: SquadsListComponent },
  { path: 'add', component: AddTutorialComponent },
  { path: 'rankings', component: SquadRankingsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
