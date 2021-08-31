import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SquadRankingsComponent } from './squad-rankings.component';

describe('SquadRankingsComponent', () => {
  let component: SquadRankingsComponent;
  let fixture: ComponentFixture<SquadRankingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SquadRankingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SquadRankingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
