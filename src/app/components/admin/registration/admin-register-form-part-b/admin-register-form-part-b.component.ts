import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA , MatDialogRef ,MatDialog, throwMatDuplicatedDrawerError,MatSnackBar } from '@angular/material';
import { MatIconRegistry , MatIcon } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, Validators, ValidatorFn ,AbstractControl , FormGroupDirective , NgForm } from '@angular/forms';
import { RegistrationService } from 'src/app/services/registration/registration.service';
import { AdminDialogData } from '../../interfaces/AdminDialogData.interface';
import { Admin } from 'src/app/modules/Admin';

@Component({
  selector: 'app-admin-register-form-part-b',
  templateUrl: './admin-register-form-part-b.component.html',
  styleUrls: ['./admin-register-form-part-b.component.css']
})
export class AdminRegisterFormPartBComponent implements OnInit {

  hide : boolean;

  admin : Admin = new Admin();

  isGenderValid : boolean;
  isPasswordValid : boolean;
  isContactNumberValid : boolean;
  isDesigntationValid : boolean;
  isRegistrationFailed : boolean;

  gender = new FormControl('',[this.genderInvalid()]);
  password = new FormControl('',[this.passwordInvalid()]);
  contactNumber = new FormControl('',[this.contactNumberInvalid()]);
  designtation = new FormControl('',[this.designtationInvalid()]);

  constructor(
    public dialogRef: MatDialogRef<AdminRegisterFormPartBComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AdminDialogData,private matIconRegistry: MatIconRegistry,
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
      this.isDesigntationValid = true;
      this.isRegistrationFailed = true;

    }

    onCancelClick(){
      this.dialogRef.close();
    }

  ngOnInit(){

  }

  getData() : void {
    console.log(this.data.admin);

    this.admin.registrationNumber = this.data.admin.registrationNumber;
    this.admin.fullName = this.data.admin.fullName;
    this.admin.email = this.data.admin.email;
    this.admin.contactNumber = this.data.admin.contactNumber;
    this.admin.password = this.data.admin.password;
    this.admin.gender = this.data.admin.gender;
    this.admin.destination = this.data.admin.destination;

    if(this.isContactNumberValid && this.isGenderValid && this.isPasswordValid && this.isDesigntationValid){
        console.log(this.data.admin);
        
        this.admin.registrationNumber = `${"A"}${this.admin.registrationNumber}`;


        this.registrationService.registerAdmin(this.admin).subscribe(x=> {
            console.log(x);
            if(x != null){
              this.isRegistrationFailed = true;
              this.openSnackBar("Added new admin to school","");
            }else{
              this.isRegistrationFailed = false;
              this.openSnackBar("Admin registration failed!. Try again ...","");
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

  designtationInvalid(){
    return (control: AbstractControl): { [key: string]: boolean } | null =>{
      if (control.value !== "" && control.value) {
        this.isDesigntationValid = true;
        return null;
      }else{
        this.isDesigntationValid = false;
        return { 'designtationInvalid': true };
      }
    };
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });

  }

}
