import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA , MatDialogRef ,MatDialog, throwMatDuplicatedDrawerError } from '@angular/material';
import { MatIconRegistry , MatIcon } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { TeacherDialogData } from '../../interfaces/TeacherDialogData.interface';
import { FormControl, Validators, ValidatorFn ,AbstractControl , FormGroupDirective , NgForm } from '@angular/forms';
import { TeacherRegisterFormPartBComponent } from '../teacher-register-form-part-b/teacher-register-form-part-b.component';
import { Teacher } from 'src/app/modules/Teacher';
import { RegistrationService } from 'src/app/services/registration/registration.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-teacher-register-form-part-a',
  templateUrl: './teacher-register-form-part-a.component.html',
  styleUrls: ['./teacher-register-form-part-a.component.css']
})
export class TeacherRegisterFormPartAComponent implements OnInit {

  hide : boolean;

  teacher : Teacher = new Teacher();

  isRegistrationNumberValid : boolean;
  isFullNameValid : boolean;
  isEmailValid : boolean;

  registrationNumberExists = false;

  email = new FormControl('', [Validators.required, Validators.email]);
  regNo = new FormControl('',[Validators.required,this.regNoInvalid()]);
  fullName = new FormControl('',[this.fullNameInvalid()]);

  matcher = new MyErrorStateMatcher();

  constructor(
    public dialogRef: MatDialogRef<TeacherRegisterFormPartAComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TeacherDialogData,private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,public dialog : MatDialog,
    private registerService : RegistrationService) {

      this.matIconRegistry.addSvgIcon(
        "hide",
        this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/hide_24dp.svg")
      ).
      addSvgIcon(
        "show",
        this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/show_24dp.svg")
      );

      this.hide = true;

      // validation
     this.isEmailValid = true;
     this.isFullNameValid = false;
     this.isRegistrationNumberValid =false;

     this.registrationNumberExists = false;
     
    }

  onCancelClick(){
    this.dialogRef.close();
    console.log(this.teacher.registrationNumber);
  }

  ngOnInit(){
    
  }

  getData() : void {

    this.teacher.registrationNumber = this.data.teacher.registrationNumber;
    this.teacher.fullName = this.data.teacher.fullName;
    this.teacher.email = this.data.teacher.email;

    this.registerService.teacherExists(this.teacher.registrationNumber).subscribe(x=> {
        if(Boolean(x)){
          this.registrationNumberExists = true;
          alert("Teacher Already exists!");
        } 
        else this.registrationNumberExists = false;



        if(this.isFullNameValid && this.isRegistrationNumberValid && this.email.valid && !this.registrationNumberExists){
          console.log(this.data.teacher);
          this.dialogRef.close();
          this.openDialogForRegisterTeacherSecondForm();
      }
    });

   
  }


  openDialogForRegisterTeacherSecondForm() : void {
    const dialogRef = this.dialog.open(TeacherRegisterFormPartBComponent, {
      width: '300px',
      disableClose : true,
      data: { teacher : this.teacher
    }
    });
  }


  // error messages
  getEmailErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }

  getRegistrationNumberInvalidMessage() {
    return "Invalid registration number";
  }

  getFullNameErrorMessage(){
    return "Cannot be empty";
  }

  regNoInvalid() {
  return (control: AbstractControl): { [key: string]: boolean } | null =>{
    if (Number(control.value) && control.value !== "" && control.value) {
      this.isRegistrationNumberValid = true;
        return null;
    }else{
      this.isRegistrationNumberValid = false;
      return {'regNoInvalid': true};
    }
  };
  }

  fullNameInvalid() {
    return (control: AbstractControl): { [key: string]: boolean } | null =>{
      if (control.value !== "" && control.value) {
        this.isFullNameValid = true;
        return null;
      }else{
        this.isFullNameValid = false;
        return { 'fullNameInvalid': true };
      }
    };
  }
  
}
