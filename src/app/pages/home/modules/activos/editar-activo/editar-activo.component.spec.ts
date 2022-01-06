import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarActivoComponent } from './editar-activo.component';

describe('EditarActivoComponent', () => {
  let component: EditarActivoComponent;
  let fixture: ComponentFixture<EditarActivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarActivoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarActivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
