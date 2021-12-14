import { TestBed } from '@angular/core/testing';

import { IncrementosService } from './incrementos.service';

describe('IncrementosService', () => {
  let service: IncrementosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IncrementosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
