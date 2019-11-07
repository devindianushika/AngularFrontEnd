import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA , MatDialogRef ,MatDialog, throwMatDuplicatedDrawerError } from '@angular/material';
import { MatIconRegistry , MatIcon } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { StudentDialogData } from '../../interfaces/StudentDialogData.interface';
import { FormControl, Validators, ValidatorFn ,AbstractControl , FormGroupDirective , NgForm } from '@angular/forms';
import { StudentRegisterFormPartBComponent } from '../student-register-form-part-b/student-register-form-part-b.component';
import { Student } from 'src/app/modules/Student';
import { RegistrationService } from 'src/app/services/registration/registration.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';


@Component({
  selector: 'app-student-register-form',
  templateUrl: './student-register-form.component.html',
  styleUrls: ['./student-register-form.component.css']
})
export class StudentRegisterFormComponent implements OnInit {


  hide : boolean;

  student : Student = new Student();

  isRegistrationNumberValid : boolean;
  isFullNameValid : boolean;
  isCurrentAddressValid : boolean;
  isBirthdayValid : boolean;

  registrationNumberExists = false;

  
  regNo = new FormControl('',[Validators.required,this.regNoInvalid()]);
  fullName = new FormControl('',[this.fullNameInvalid()]);
  currentAddress = new FormControl('',[this.currentAddressInvalid()]);
  birthday = new FormControl('',[this.birthdayInvalid()])
  
  constructor(
    public dialogRef: MatDialogRef<StudentRegisterFormPartBComponent>,
    @Inject(MAT_DIALOG_DATA) public data: StudentDialogData,private matIconRegistry: MatIconRegistry,
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
   
     this.isFullNameValid = false;
     this.isRegistrationNumberValid =false;
    this.isCurrentAddressValid = false;
     this.registrationNumberExists = false;
     this.isBirthdayValid = false;
     
    }

  onCancelClick(){
    this.dialogRef.close();
    console.log(this.student.registrationNumber);
  }

  ngOnInit(){
    
  }

  getData() : void {

    this.student.registrationNumber = this.data.student.registrationNumber;
    this.student.fullName = this.data.student.fullName;
    this.student.currentAddress = this.data.student.currentAddress;
    this.student.birthday = this.data.student.birthday;

    this.registerService.studentExists(this.student.registrationNumber).subscribe(x=> {
        if(Boolean(x)){
          this.registrationNumberExists = true;
          alert("Student Already exists!");
        } 
        else this.registrationNumberExists = false;

        if(this.isFullNameValid && this.isRegistrationNumberValid && this.isBirthdayValid && this.isCurrentAddressValid  && !this.registrationNumberExists){
          console.log(this.data.student);
          this.dialogRef.close();
          this.openDialogForRegisterStudentSecondForm();
      }

    });

   
  }


  openDialogForRegisterStudentSecondForm() : void {
    const dialogRef = this.dialog.open(StudentRegisterFormPartBComponent, {
      width: '350px',
      disableClose : true,
      data: { student : this.student
    }
    });
  }


  // error messages
  getBirthdayInvalidErrorMessage(){
    return "Cannot be empty"
  }

  getRegistrationNumberInvalidMessage() {
    return "Invalid registration number";
  }

  getFullNameErrorMessage(){
    return "Cannot be empty";
  }

  getContactNumberErrorMessage() {
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

  currentAddressInvalid() {
    return (control: AbstractControl): { [key: string]: boolean } | null =>{
      if (control.value !== "" && control.value) {
        this.isCurrentAddressValid = true;
        return null;
      }else{
        this.isCurrentAddressValid = false;
        return { 'currentAddressInvalid': true };
      }
    };
  }

  birthdayInvalid() {
    return (control: AbstractControl): { [key: string]: boolean } | null =>{
      if (control.value !== "" && control.value) {
        this.isBirthdayValid = true;
        return null;
      }else{
        this.isBirthdayValid = false;
        return { 'birthdayInvalid': true };
      }
    };
  }


}
