import { Component,Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StudentRegisterFormComponent } from '../registration/student-register-form/student-register-form.component';
import { stringify } from 'querystring';
import { TeacherRegisterFormPartAComponent } from '../registration/teacher-register-form-part-a/teacher-register-form-part-a.component';
import { Teacher } from 'src/app/modules/Teacher';
import { RegistrationtypesformComponent } from '../registration/registrationtypesform/registrationtypesform.component';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent  {

  constructor(public dialog : MatDialog) { 
    
   }

  
  onRegistrationClick() : void {
    const dialogRef = this.dialog.open(RegistrationtypesformComponent, {
      width: '300px',
      disableClose : false
    });

  }

  
  


}


