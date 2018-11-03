import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoFormComponent } from './pago-form.component';

describe('PagoFormComponent', () => {
  let component: PagoFormComponent;
  let fixture: ComponentFixture<PagoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
