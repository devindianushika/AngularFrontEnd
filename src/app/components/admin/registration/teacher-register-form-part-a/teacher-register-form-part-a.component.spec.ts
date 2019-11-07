import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherRegisterFormPartAComponent } from './teacher-register-form-part-a.component';

describe('TeacherRegisterFormPartAComponent', () => {
  let component: TeacherRegisterFormPartAComponent;
  let fixture: ComponentFixture<TeacherRegisterFormPartAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherRegisterFormPartAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherRegisterFormPartAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
