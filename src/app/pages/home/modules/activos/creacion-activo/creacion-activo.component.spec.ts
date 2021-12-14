import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreacionActivoComponent } from './creacion-activo.component';

describe('CreacionActivoComponent', () => {
  let component: CreacionActivoComponent;
  let fixture: ComponentFixture<CreacionActivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreacionActivoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreacionActivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
