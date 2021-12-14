import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataUsuariosComponent } from './data-usuarios.component';

describe('DataUsuariosComponent', () => {
  let component: DataUsuariosComponent;
  let fixture: ComponentFixture<DataUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataUsuariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
