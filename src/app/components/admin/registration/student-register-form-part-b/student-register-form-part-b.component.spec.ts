import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentRegisterFormPartBComponent } from './student-register-form-part-b.component';

describe('StudentRegisterFormPartBComponent', () => {
  let component: StudentRegisterFormPartBComponent;
  let fixture: ComponentFixture<StudentRegisterFormPartBComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentRegisterFormPartBComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentRegisterFormPartBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
