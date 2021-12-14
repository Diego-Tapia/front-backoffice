import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEmisionActivoComponent } from './modal-emision-activo.component';

describe('ModalEmisionActivoComponent', () => {
  let component: ModalEmisionActivoComponent;
  let fixture: ComponentFixture<ModalEmisionActivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEmisionActivoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEmisionActivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
