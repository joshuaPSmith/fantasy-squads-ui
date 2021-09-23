import { AuthService } from './../../services/authentication/authentication.service';
import { SquadsService } from './../../services/squads/squads.service';
import { StatsService } from '../../services/stats/stats.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import Squad from 'src/app/models/squad.model';

@Component({
  selector: 'app-squads-list',
  templateUrl: './squads-list.component.html',
  styleUrls: ['./squads-list.component.css']
})
export class SquadsListComponent implements OnInit {

  squads?: Squad[];
  currentSquad?: Squad;
  currentIndex = -1;
  title = '';

  constructor(
    private squadsService: SquadsService,
    private authService: AuthService,
    private cdf: ChangeDetectorRef) { }

  ngOnInit(): void {
    // this.retrieveSquads();
    // console.log("##USER##", this.authService.userData)
  }

  refreshList(): void {
    this.currentSquad = undefined;
    this.currentIndex = -1;
    this.retrieveSquads();
  }

  retrieveSquads(): void {
    this.squadsService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map((c: { payload: { doc: { id: any; data: () => any; }; }; }) =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe((data: Squad[] | undefined) => {
      this.squads = data;
      this.cdf.detectChanges();
    });
  }

  setActiveSquad(squad: Squad, index: number): void {
    this.currentSquad = squad;
    this.currentIndex = index;
  }

}
