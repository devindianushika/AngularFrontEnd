import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherRegisterFormPartBComponent } from './teacher-register-form-part-b.component';

describe('TeacherRegisterFormPartBComponent', () => {
  let component: TeacherRegisterFormPartBComponent;
  let fixture: ComponentFixture<TeacherRegisterFormPartBComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherRegisterFormPartBComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherRegisterFormPartBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
