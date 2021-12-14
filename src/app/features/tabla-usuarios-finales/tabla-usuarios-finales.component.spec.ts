import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaUsuariosFinalesComponent } from './tabla-usuarios-finales.component';

describe('TablaUsuariosFinalesComponent', () => {
  let component: TablaUsuariosFinalesComponent;
  let fixture: ComponentFixture<TablaUsuariosFinalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaUsuariosFinalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaUsuariosFinalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
