import { TestBed } from '@angular/core/testing';

import { UiControllerService } from './ui-controller.service';

describe('UiControllerService', () => {
  let service: UiControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UiControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
