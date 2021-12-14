import { TestBed } from '@angular/core/testing';

import { DisminucionesService } from './disminuciones.service';

describe('DisminucionesService', () => {
  let service: DisminucionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisminucionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
