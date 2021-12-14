import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNuevaOperacionDisminucionComponent } from './modal-nueva-operacion-disminucion.component';

describe('ModalNuevaOperacionDisminucionComponent', () => {
  let component: ModalNuevaOperacionDisminucionComponent;
  let fixture: ComponentFixture<ModalNuevaOperacionDisminucionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalNuevaOperacionDisminucionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalNuevaOperacionDisminucionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
