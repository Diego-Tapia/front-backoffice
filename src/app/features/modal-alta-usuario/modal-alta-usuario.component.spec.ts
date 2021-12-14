import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAltaUsuarioComponent } from './modal-alta-usuario.component';

describe('ModalAltaUsuarioComponent', () => {
  let component: ModalAltaUsuarioComponent;
  let fixture: ComponentFixture<ModalAltaUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAltaUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAltaUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
