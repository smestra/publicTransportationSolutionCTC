import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearNotificacionComponent } from './crear-notificacion.component';

describe('CrearNotificacionComponent', () => {
  let component: CrearNotificacionComponent;
  let fixture: ComponentFixture<CrearNotificacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearNotificacionComponent]
    });
    fixture = TestBed.createComponent(CrearNotificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
