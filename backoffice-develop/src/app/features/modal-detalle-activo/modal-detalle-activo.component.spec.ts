import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetalleActivoComponent } from './modal-detalle-activo.component';

describe('ModalDetalleActivoComponent', () => {
  let component: ModalDetalleActivoComponent;
  let fixture: ComponentFixture<ModalDetalleActivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDetalleActivoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDetalleActivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
