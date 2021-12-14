import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataIncrementosComponent } from './data-incrementos.component';

describe('DataIncrementosComponent', () => {
  let component: DataIncrementosComponent;
  let fixture: ComponentFixture<DataIncrementosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataIncrementosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataIncrementosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
