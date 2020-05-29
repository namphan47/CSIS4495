import { TestBed } from '@angular/core/testing';

import { SimulatorDataService } from './simulator-data.service';

describe('SimulatorDataService', () => {
  let service: SimulatorDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SimulatorDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
