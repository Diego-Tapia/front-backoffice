import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoIncrementoIndividualComponent } from './nuevo-incremento-individual.component';

describe('NuevoIncrementoIndividualComponent', () => {
  let component: NuevoIncrementoIndividualComponent;
  let fixture: ComponentFixture<NuevoIncrementoIndividualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoIncrementoIndividualComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoIncrementoIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
