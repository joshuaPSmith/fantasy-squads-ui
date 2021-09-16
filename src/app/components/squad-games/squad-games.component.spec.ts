import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SquadGamesComponent } from './squad-games.component';

describe('SquadGamesComponent', () => {
  let component: SquadGamesComponent;
  let fixture: ComponentFixture<SquadGamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SquadGamesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SquadGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
