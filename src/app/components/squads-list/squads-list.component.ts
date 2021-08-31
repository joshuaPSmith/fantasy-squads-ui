import { StatsService } from '../../services/stats/stats.service';
import { Component, OnInit } from '@angular/core';
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

  constructor(private statsService: StatsService) { }

  ngOnInit(): void {
    // this.retrieveSquads();
  }

  refreshList(): void {
    this.currentSquad = undefined;
    this.currentIndex = -1;
    this.retrieveSquads();
  }

  retrieveSquads(): void {
    this.statsService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map((c: { payload: { doc: { id: any; data: () => any; }; }; }) =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe((data: Squad[] | undefined) => {
      this.squads = data;
    });
  }

  setActiveTutorial(squad: Squad, index: number): void {
    this.currentSquad = squad;
    this.currentIndex = index;
  }

  public async getStats() {
    this.statsService.getStats();
  }

}
