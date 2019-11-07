import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA , MatDialogRef, MatSnackBar } from '@angular/material';
import { MatIconRegistry , MatIcon } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, Validators ,AbstractControl } from '@angular/forms';
import { RegistrationService } from 'src/app/services/registration/registration.service';
import { Parent } from 'src/app/modules/Parent';
import { ParentDialogData } from '../../interfaces/ParentDialogData.interface';
import { ParentListener } from '../../interfaces/ParentListener';

@Component({
  selector: 'app-parent-register-form-part-b',
  templateUrl: './parent-register-form-part-b.component.html',
  styleUrls: ['./parent-register-form-part-b.component.css']
})
export class ParentRegisterFormPartBComponent implements OnInit {

  hide : boolean;

  parent : Parent = new Parent();

  isGenderValid : boolean;
  isPasswordValid : boolean;
  isContactNumberValid : boolean;
  isAddessValid : boolean;
  isRegistrationFailed : boolean;

  gender = new FormControl('',[this.genderInvalid()]);
  password = new FormControl('',[this.passwordInvalid()]);
  contactNumber = new FormControl('',[this.contactNumberInvalid()]);
  address = new FormControl('',[this.addressInvalid()]);

  constructor(
    public dialogRef: MatDialogRef<ParentRegisterFormPartBComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ParentDialogData,private matIconRegistry: MatIconRegistry,
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
      this.isAddessValid = true;
      this.isRegistrationFailed = true;

    }

    onCancelClick(){
      this.dialogRef.close();
    }

  ngOnInit(){

  }

  getData() : void {
    console.log(this.data.parent);

    this.parent.registrationNumber = this.data.parent.registrationNumber;
    this.parent.fullName = this.data.parent.fullName;
    this.parent.email = this.data.parent.email;
    this.parent.contactNumber = this.data.parent.contactNumber;
    this.parent.password = this.data.parent.password;
    this.parent.gender = this.data.parent.gender;
    this.parent.address = this.data.parent.address;

    if(this.isContactNumberValid && this.isGenderValid && this.isPasswordValid && this.isAddessValid){
        console.log(this.data.parent);
        
        this.parent.registrationNumber = `${"P"}${this.parent.registrationNumber}`;


        this.registrationService.registerParent(this.parent).subscribe(x=> {
            console.log(x);
            if(x != null){
              
              this.isRegistrationFailed = true;
              this.openSnackBar("Added new parent to school","");
            }else{
              this.isRegistrationFailed = false;
              this.openSnackBar("Parent registration failed!. Try again ...","");
            }
            this.dialogRef.close();

        });

    }

  }


  // error messages
  getAddressInvalidErrorMessage(){
    return "Cannot be empty";
  }
  
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


  addressInvalid(){
    return (control: AbstractControl): { [key: string]: boolean } | null =>{
      if (control.value !== "" && control.value) {
        this.isAddessValid = true;
        return null;
      }else{
        this.isAddessValid = false;
        return { 'addressInvalid': true };
      }
    };
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });

  }

}

