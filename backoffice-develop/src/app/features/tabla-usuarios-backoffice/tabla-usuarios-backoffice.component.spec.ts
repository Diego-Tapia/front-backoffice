import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaUsuariosBackofficeComponent } from './tabla-usuarios-backoffice.component';

describe('TablaUsuariosBackofficeComponent', () => {
  let component: TablaUsuariosBackofficeComponent;
  let fixture: ComponentFixture<TablaUsuariosBackofficeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaUsuariosBackofficeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaUsuariosBackofficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
