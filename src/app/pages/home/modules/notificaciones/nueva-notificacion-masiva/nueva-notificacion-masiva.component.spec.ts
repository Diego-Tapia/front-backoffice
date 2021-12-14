import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaNotificacionMasivaComponent } from './nueva-notificacion-masiva.component';

describe('NuevaNotificacionMasivaComponent', () => {
  let component: NuevaNotificacionMasivaComponent;
  let fixture: ComponentFixture<NuevaNotificacionMasivaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevaNotificacionMasivaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaNotificacionMasivaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
