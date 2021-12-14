import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaDisminucionIndividualComponent } from './nueva-disminucion-individual.component';

describe('NuevaDisminucionIndividualComponent', () => {
  let component: NuevaDisminucionIndividualComponent;
  let fixture: ComponentFixture<NuevaDisminucionIndividualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevaDisminucionIndividualComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaDisminucionIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
