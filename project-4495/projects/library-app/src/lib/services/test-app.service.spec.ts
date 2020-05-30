import { TestBed } from '@angular/core/testing';

import { TestAppService } from './test-app.service';

describe('TestAppService', () => {
  let service: TestAppService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestAppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
