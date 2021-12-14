import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaMasivosComponent } from './tabla-masivos.component';

describe('TablaMasivosComponent', () => {
  let component: TablaMasivosComponent;
  let fixture: ComponentFixture<TablaMasivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaMasivosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaMasivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
