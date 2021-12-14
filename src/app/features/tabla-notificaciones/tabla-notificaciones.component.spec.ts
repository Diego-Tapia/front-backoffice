import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaNotificacionesComponent } from './tabla-notificaciones.component';

describe('TablaNotificacionesComponent', () => {
  let component: TablaNotificacionesComponent;
  let fixture: ComponentFixture<TablaNotificacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaNotificacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaNotificacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
