import { TestBed } from '@angular/core/testing';

import { FibsService } from './fibs.service';

describe('FibsService', () => {
  let service: FibsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FibsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
