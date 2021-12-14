import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNuevaOperacionComponent } from './modal-nueva-operacion.component';

describe('ModalNuevaOperacionComponent', () => {
  let component: ModalNuevaOperacionComponent;
  let fixture: ComponentFixture<ModalNuevaOperacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalNuevaOperacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalNuevaOperacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
