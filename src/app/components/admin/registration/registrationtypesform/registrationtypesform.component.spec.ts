import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationtypesformComponent } from './registrationtypesform.component';

describe('RegistrationtypesformComponent', () => {
  let component: RegistrationtypesformComponent;
  let fixture: ComponentFixture<RegistrationtypesformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationtypesformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationtypesformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
