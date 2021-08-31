import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SquadsListComponent } from './squads-list.component';

describe('SquadsListComponent', () => {
  let component: SquadsListComponent;
  let fixture: ComponentFixture<SquadsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SquadsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SquadsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
