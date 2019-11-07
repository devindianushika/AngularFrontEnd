import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA , MatDialogRef ,MatDialog, throwMatDuplicatedDrawerError } from '@angular/material';
import { MatIconRegistry , MatIcon } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, Validators, ValidatorFn ,AbstractControl , FormGroupDirective , NgForm } from '@angular/forms';
import { RegistrationService } from 'src/app/services/registration/registration.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Parent } from 'src/app/modules/Parent';
import { ParentDialogData } from '../../interfaces/ParentDialogData.interface';
import { StudentRegisterFormPartBComponent } from '../student-register-form-part-b/student-register-form-part-b.component';
import { ParentRegisterFormPartBComponent } from '../parent-register-form-part-b/parent-register-form-part-b.component';

@Component({
  selector: 'app-parent-register-form',
  templateUrl: './parent-register-form.component.html',
  styleUrls: ['./parent-register-form.component.css']
})
export class ParentRegisterFormComponent implements OnInit {

  hide : boolean;

  parent : Parent = new Parent();

  isRegistrationNumberValid : boolean;
  isFullNameValid : boolean;
  isEmailValid : boolean;

  registrationNumberExists = false;

  email = new FormControl('', [Validators.required, Validators.email]);
  regNo = new FormControl('',[Validators.required,this.regNoInvalid()]);
  fullName = new FormControl('',[this.fullNameInvalid()]);

  

  constructor(
    public dialogRef: MatDialogRef<ParentRegisterFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ParentDialogData,private matIconRegistry: MatIconRegistry,
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
    console.log(this.parent.registrationNumber);
  }

  ngOnInit(){
    
  }

  getData() : void {

    this.parent.registrationNumber = this.data.parent.registrationNumber;
    this.parent.fullName = this.data.parent.fullName;
    this.parent.email = this.data.parent.email;

    this.registerService.parentExists(this.parent.registrationNumber).subscribe(x=> {
        if(Boolean(x)){
          this.registrationNumberExists = true;
          alert("Parent Already exists!");
        } 
        else this.registrationNumberExists = false;



        if(this.isFullNameValid && this.isRegistrationNumberValid && this.email.valid && !this.registrationNumberExists){
          console.log(this.data.parent);
          this.dialogRef.close();
          this.openDialogForRegisterParentSecondForm();
      }
    });

   
  }


  openDialogForRegisterParentSecondForm() : void {
    const dialogRef = this.dialog.open(ParentRegisterFormPartBComponent, {
      width: '300px',
      disableClose : true,
      data: { parent : this.parent
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
