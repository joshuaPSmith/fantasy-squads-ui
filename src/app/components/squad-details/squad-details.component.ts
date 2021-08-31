import { StatsService } from '../../services/stats/stats.service';
import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import Squad from 'src/app/models/squad.model';
import { TutorialService } from 'src/app/services/tutorial/tutorial.service';

@Component({
  selector: 'app-squad-details',
  templateUrl: './squad-details.component.html',
  styleUrls: ['./squad-details.component.css']
})
export class TutorialDetailsComponent implements OnInit, OnChanges {

  @Input() squad: Squad = {name: '', teamsList: []};
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  public currentSquad: Squad = {
    name: '',
    teamsList: []
  };
  message = '';

  constructor(private tutorialService: TutorialService, private statsService: StatsService) {   }

  ngOnInit(): void {
    this.message = '';
  }

  ngOnChanges(): void {
    this.message = '';
    this.currentSquad = { ...this.squad };
  }

  async updateTutorial(): Promise<void> {
    const data = {
      name: this.currentSquad.name,
      teams: this.currentSquad.teamsList
    };

    if (this.currentSquad.id) {
      try {
        await this.tutorialService.update(this.currentSquad.id, data);
        this.message = 'The tutorial was updated successfully!';
      } catch (error) {
        console.log(error);
      }
    }
  }

  // deleteTutorial(): void {
  //   if (this.currentSquad.id) {
  //     this.tutorialService.delete(this.currentSquad.id)
  //       .then(() => {
  //         this.refreshList.emit();
  //         this.message = 'The tutorial was updated successfully!';
  //       })
  //       .catch(err => console.log(err));
  //   }
  // }

}
