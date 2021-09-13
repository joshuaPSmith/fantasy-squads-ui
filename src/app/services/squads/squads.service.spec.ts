import { TestBed } from '@angular/core/testing';

import { SquadsService } from './squads.service';

describe('SquadsService', () => {
  let service: SquadsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SquadsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
