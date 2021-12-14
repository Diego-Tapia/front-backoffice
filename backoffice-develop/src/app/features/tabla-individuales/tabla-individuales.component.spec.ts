import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaIndividualesComponent } from './tabla-individuales.component';

describe('TablaIndividualesComponent', () => {
  let component: TablaIndividualesComponent;
  let fixture: ComponentFixture<TablaIndividualesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaIndividualesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaIndividualesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
