import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataDisminucionesComponent } from './data-disminuciones.component';

describe('DataDisminucionesComponent', () => {
  let component: DataDisminucionesComponent;
  let fixture: ComponentFixture<DataDisminucionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataDisminucionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataDisminucionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
