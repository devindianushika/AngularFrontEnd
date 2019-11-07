import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ErrorStateMatcher , ShowOnDirtyErrorStateMatcher } from '@angular/material/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatToolbarModule,
MatButtonModule,
MatIconModule,
MatProgressSpinnerModule,
MatButtonToggleModule,
MatFormFieldModule,
MatOptionModule,
MatSelectModule,
MatInputModule,
MatCheckboxModule,
MatSidenavModule,
MatMenuModule,
MatListModule,
MatDialogModule,
MatDatepickerModule,
MatRadioModule,
MatNativeDateModule,
MatSnackBarModule,
MatCardModule,
MatGridListModule,
MatAutocompleteModule
 } from '@angular/material';






import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ToolBarComponent } from './components/tool-bar/tool-bar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { JwtInterceptor, ErrorInterceptor } from './auth';
import { BottomBarComponent } from './components/bottom-bar/bottom-bar.component';
import { StudentRegisterFormComponent } from './components/admin/registration/student-register-form/student-register-form.component';
import { ParentRegisterFormComponent } from './components/admin/registration/parent-register-form/parent-register-form.component';
import { AdminRegisterFormComponent } from './components/admin/registration/admin-register-form/admin-register-form.component';
import { AdministrationComponent } from './components/admin/administration/administration.component';
import { StudentRegisterFormPartBComponent } from './components/admin/registration/student-register-form-part-b/student-register-form-part-b.component';
import { TeacherRegisterFormPartAComponent } from './components/admin/registration/teacher-register-form-part-a/teacher-register-form-part-a.component';
import { TeacherRegisterFormPartBComponent } from './components/admin/registration/teacher-register-form-part-b/teacher-register-form-part-b.component';
import { AdminRegisterFormPartBComponent } from './components/admin/registration/admin-register-form-part-b/admin-register-form-part-b.component';
import { ParentRegisterFormPartBComponent } from './components/admin/registration/parent-register-form-part-b/parent-register-form-part-b.component';
import { RegistrationtypesformComponent } from './components/admin/registration/registrationtypesform/registrationtypesform.component';
import { ParentListener } from './components/admin/interfaces/ParentListener';
import { UserProfileComponent } from './components/user-profile/user-profile/user-profile.component';
import { PeopleComponent } from './components/people/people.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ToolBarComponent,
    DashboardComponent,
    HomeComponent,
    BottomBarComponent,
    StudentRegisterFormComponent,
    ParentRegisterFormComponent,
    AdminRegisterFormComponent,
    AdministrationComponent,
    StudentRegisterFormPartBComponent,
    TeacherRegisterFormPartAComponent,
    TeacherRegisterFormPartBComponent,
    AdminRegisterFormPartBComponent,
    ParentRegisterFormPartBComponent,
    RegistrationtypesformComponent,
    UserProfileComponent,
    PeopleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatButtonToggleModule,
    HttpClientModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatInputModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatMenuModule,
    MatListModule,
    FormsModule,
    MatDialogModule,
    MatDatepickerModule,
    MatRadioModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatCardModule,
    MatGridListModule,
    MatSnackBarModule,
    MatAutocompleteModule
  ],entryComponents : [
    StudentRegisterFormComponent,
    StudentRegisterFormPartBComponent,
    TeacherRegisterFormPartAComponent,
    TeacherRegisterFormPartBComponent,
    AdminRegisterFormComponent,
    AdminRegisterFormPartBComponent,
    ParentRegisterFormComponent,
    ParentRegisterFormPartBComponent,
    RegistrationtypesformComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}
 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
