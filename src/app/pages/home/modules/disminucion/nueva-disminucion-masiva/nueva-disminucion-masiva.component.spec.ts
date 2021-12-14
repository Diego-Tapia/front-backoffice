import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaDisminucionMasivaComponent } from './nueva-disminucion-masiva.component';

describe('NuevaDisminucionMasivaComponent', () => {
  let component: NuevaDisminucionMasivaComponent;
  let fixture: ComponentFixture<NuevaDisminucionMasivaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevaDisminucionMasivaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaDisminucionMasivaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
