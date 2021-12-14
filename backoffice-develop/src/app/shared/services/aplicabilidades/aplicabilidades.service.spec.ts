import { TestBed } from '@angular/core/testing';

import { AplicabilidadesService } from './aplicabilidades.service';

describe('AplicabilidadesService', () => {
  let service: AplicabilidadesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AplicabilidadesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
