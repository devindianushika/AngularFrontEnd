import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA , MatDialogRef, MatSnackBar } from '@angular/material';
import { MatIconRegistry , MatIcon } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { TeacherDialogData } from '../../interfaces/TeacherDialogData.interface';
import { FormControl, Validators ,AbstractControl } from '@angular/forms';
import { Teacher } from 'src/app/modules/Teacher';
import { RegistrationService } from 'src/app/services/registration/registration.service';

@Component({
  selector: 'app-teacher-register-form-part-b',
  templateUrl: './teacher-register-form-part-b.component.html',
  styleUrls: ['./teacher-register-form-part-b.component.css']
})
export class TeacherRegisterFormPartBComponent implements OnInit {

  hide : boolean;

  teacher : Teacher = new Teacher();

  isGenderValid : boolean;
  isPasswordValid : boolean;
  isContactNumberValid : boolean;
  isRegistrationFailed : boolean;

  gender = new FormControl('',[this.genderInvalid()]);
  password = new FormControl('',[this.passwordInvalid()]);
  contactNumber = new FormControl('',[this.contactNumberInvalid()]);

  constructor(
    public dialogRef: MatDialogRef<TeacherRegisterFormPartBComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TeacherDialogData,private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private registrationService : RegistrationService,private _snackBar : MatSnackBar) {

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
    
      this.isContactNumberValid = true;
      this.isPasswordValid = true;
      this.isGenderValid = true;
      this.isRegistrationFailed = true;

    }

    onCancelClick(){
      this.dialogRef.close();
    }

  ngOnInit(){

  }

  getData() : void {
    console.log(this.data.teacher);

    this.teacher.registrationNumber = this.data.teacher.registrationNumber;
    this.teacher.fullName = this.data.teacher.fullName;
    this.teacher.email = this.data.teacher.email;
    this.teacher.contactNumber = this.data.teacher.contactNumber;
    this.teacher.password = this.data.teacher.password;
    this.teacher.gender = this.data.teacher.gender;

    if(this.isContactNumberValid && this.isGenderValid && this.isPasswordValid){
        console.log(this.data.teacher);
        
        this.teacher.registrationNumber = `${"T"}${this.teacher.registrationNumber}`;


        this.registrationService.registerTeacher(this.teacher).subscribe(x=> {
            console.log(x);
            if(x != null){
              this.isRegistrationFailed = true;
              this.openSnackBar("Added new teacher to school","");
            }else{
              this.isRegistrationFailed = false;
              this.openSnackBar("Teacher registration failed!. Try again ...","");
            }
            this.dialogRef.close();

        });

    }

  }


  // error messages

  
  getGenderInvalidErrorMessage(){
    return "Cannot be empty"
  }

  getContactNumberInvalidErrorMessage(){
    return "Cannot be empty"
  }

  getPasswordInvalidErrorMessage(){
    return "Cannot be empty"
  }

  getRegistrationErrorMessage(){
    return "Registration failed";
  }

  genderInvalid(){
    return (control: AbstractControl): { [key: string]: boolean } | null =>{
      if (control.value !== "" && control.value) {
        this.isGenderValid = true;
        return null;
      }else{
        this.isGenderValid = false;
        return { 'genderInvalid': true };
      }
    };
  }

  passwordInvalid(){
    return (control: AbstractControl): { [key: string]: boolean } | null =>{
      if (control.value !== "" && control.value) {
        this.isPasswordValid = true;
        return null;
      }else{
        this.isPasswordValid = false;
        return { 'passwordInvalid': true };
      }
    };
  }

  contactNumberInvalid(){
    return (control: AbstractControl): { [key: string]: boolean } | null =>{
      if (control.value !== "" && control.value) {
        this.isContactNumberValid = true;
        return null;
      }else{
        this.isContactNumberValid = false;
        return { 'contactNumberInvalid': true };
      }
    };
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });

  }

}
