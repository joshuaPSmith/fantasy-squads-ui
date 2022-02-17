import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-roster',
  templateUrl: './roster.component.html',
  styleUrls: ['./roster.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RosterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
