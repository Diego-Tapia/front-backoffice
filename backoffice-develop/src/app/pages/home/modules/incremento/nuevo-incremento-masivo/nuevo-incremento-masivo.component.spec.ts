import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoIncrementoMasivoComponent } from './nuevo-incremento-masivo.component';

describe('NuevoIncrementoMasivoComponent', () => {
  let component: NuevoIncrementoMasivoComponent;
  let fixture: ComponentFixture<NuevoIncrementoMasivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoIncrementoMasivoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoIncrementoMasivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
