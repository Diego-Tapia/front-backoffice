import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaInicioComponent } from './tabla-inicio.component';

describe('TablaInicioComponent', () => {
  let component: TablaInicioComponent;
  let fixture: ComponentFixture<TablaInicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaInicioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
