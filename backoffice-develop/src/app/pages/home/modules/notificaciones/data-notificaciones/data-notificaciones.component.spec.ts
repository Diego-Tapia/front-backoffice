import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataNotificacionesComponent } from './data-notificaciones.component';

describe('DataNotificacionesComponent', () => {
  let component: DataNotificacionesComponent;
  let fixture: ComponentFixture<DataNotificacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataNotificacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataNotificacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
