import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificacionActivoComponent } from './modificacion-activo.component';

describe('ModificacionActivoComponent', () => {
  let component: ModificacionActivoComponent;
  let fixture: ComponentFixture<ModificacionActivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificacionActivoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificacionActivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
