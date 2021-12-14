import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificacionUsuarioComponent } from './modificacion-usuario.component';

describe('ModificacionUsuarioComponent', () => {
  let component: ModificacionUsuarioComponent;
  let fixture: ComponentFixture<ModificacionUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificacionUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificacionUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
