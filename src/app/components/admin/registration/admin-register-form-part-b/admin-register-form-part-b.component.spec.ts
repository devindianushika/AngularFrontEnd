import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRegisterFormPartBComponent } from './admin-register-form-part-b.component';

describe('AdminRegisterFormPartBComponent', () => {
  let component: AdminRegisterFormPartBComponent;
  let fixture: ComponentFixture<AdminRegisterFormPartBComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminRegisterFormPartBComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRegisterFormPartBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
