import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentRegisterFormPartBComponent } from './parent-register-form-part-b.component';

describe('ParentRegisterFormPartBComponent', () => {
  let component: ParentRegisterFormPartBComponent;
  let fixture: ComponentFixture<ParentRegisterFormPartBComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParentRegisterFormPartBComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentRegisterFormPartBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
