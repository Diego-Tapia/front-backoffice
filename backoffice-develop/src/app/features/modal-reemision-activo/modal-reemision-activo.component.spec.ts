import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalReemisionActivoComponent } from './modal-reemision-activo.component';

describe('ModalReemisionActivoComponent', () => {
  let component: ModalReemisionActivoComponent;
  let fixture: ComponentFixture<ModalReemisionActivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalReemisionActivoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalReemisionActivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
