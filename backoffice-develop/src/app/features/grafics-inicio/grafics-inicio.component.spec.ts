import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficsInicioComponent } from './grafics-inicio.component';

describe('GraficsInicioComponent', () => {
  let component: GraficsInicioComponent;
  let fixture: ComponentFixture<GraficsInicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficsInicioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficsInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
