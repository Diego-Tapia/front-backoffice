import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataActivosComponent } from './data-activos.component';

describe('DataActivosComponent', () => {
  let component: DataActivosComponent;
  let fixture: ComponentFixture<DataActivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataActivosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataActivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
