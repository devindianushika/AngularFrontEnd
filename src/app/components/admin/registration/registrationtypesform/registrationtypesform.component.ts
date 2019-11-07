import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA , MatDialogRef ,MatDialog, throwMatDuplicatedDrawerError } from '@angular/material';
import { StudentRegisterFormComponent } from '../student-register-form/student-register-form.component';
import { TeacherRegisterFormPartAComponent } from '../teacher-register-form-part-a/teacher-register-form-part-a.component';
import { Teacher } from '../../../../modules/Teacher';
import { AdminRegisterFormComponent } from '../admin-register-form/admin-register-form.component';
import { Admin } from 'src/app/modules/Admin';
import { Student } from 'src/app/modules/Student';

@Component({
  selector: 'app-registrationtypesform',
  templateUrl: './registrationtypesform.component.html',
  styleUrls: ['./registrationtypesform.component.css']
})
export class RegistrationtypesformComponent implements OnInit {

    
    admin : Admin;
    teacher : Teacher;
    student : Student;


  constructor(public dialogRef: MatDialogRef<RegistrationtypesformComponent>,
   public dialog : MatDialog) { 
    this.teacher = new Teacher();
    this.admin = new Admin();
    this.student = new Student();
   }

  ngOnInit() {
  }

  openDialogForRegisterStudentFirstForm() : void {
    const dialogRef = this.dialog.open(StudentRegisterFormComponent, {
      width: '300px',
      disableClose : true,
      data: { student : this.student
    }
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    // });
  }

  openDialogForRegisterTeacherFirstForm() : void {
    const dialogRef = this.dialog.open(TeacherRegisterFormPartAComponent, {
      width: '300px',
      disableClose : true,
      data: {
        teacher : this.teacher
    }
    });
  }

  openDialogForRegisterAdminFirstForm() : void {
    const dialogRef = this.dialog.open(AdminRegisterFormComponent, {
      width: '300px',
      disableClose : true,
      data: {
        admin : this.admin
    }
    });
  }



}
