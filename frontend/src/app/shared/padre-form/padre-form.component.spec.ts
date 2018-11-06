import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PadreFormComponent } from './padre-form.component';

describe('PadreFormComponent', () => {
  let component: PadreFormComponent;
  let fixture: ComponentFixture<PadreFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PadreFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PadreFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
