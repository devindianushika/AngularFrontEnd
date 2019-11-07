import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA , MatDialogRef ,MatDialog, throwMatDuplicatedDrawerError } from '@angular/material';
import { MatIconRegistry , MatIcon } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, Validators, ValidatorFn ,AbstractControl , FormGroupDirective , NgForm } from '@angular/forms';
import { RegistrationService } from 'src/app/services/registration/registration.service';
import { AdminDialogData } from '../../interfaces/AdminDialogData.interface';
import { Admin } from 'src/app/modules/Admin';
import { AdminRegisterFormPartBComponent } from '../admin-register-form-part-b/admin-register-form-part-b.component';

@Component({
  selector: 'app-admin-register-form',
  templateUrl: './admin-register-form.component.html',
  styleUrls: ['./admin-register-form.component.css']
})
export class AdminRegisterFormComponent implements OnInit {

  hide : boolean;

  admin : Admin = new Admin();

  isRegistrationNumberValid : boolean;
  isFullNameValid : boolean;
  isEmailValid : boolean;

  registrationNumberExists = false;

  email = new FormControl('', [Validators.required, Validators.email]);
  regNo = new FormControl('',[Validators.required,this.regNoInvalid()]);
  fullName = new FormControl('',[this.fullNameInvalid()]);

  
  constructor(
    public dialogRef: MatDialogRef<AdminRegisterFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AdminDialogData,private matIconRegistry: MatIconRegistry,
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
    console.log(this.admin.registrationNumber);
  }

  ngOnInit(){
    
  }

  getData() : void {

    this.admin.registrationNumber = this.data.admin.registrationNumber;
    this.admin.fullName = this.data.admin.fullName;
    this.admin.email = this.data.admin.email;

    this.registerService.adminExists(this.admin.registrationNumber).subscribe(x=> {
        if(Boolean(x)){
          this.registrationNumberExists = true;
          alert("Admin Already exists!");
        } 
        else this.registrationNumberExists = false;

        if(this.isFullNameValid && this.isRegistrationNumberValid && this.email.valid && !this.registrationNumberExists){
          console.log(this.data.admin);
          this.dialogRef.close();
          this.openDialogForRegisterAdminSecondForm();
      }
    });

   
  }


  openDialogForRegisterAdminSecondForm() : void {
    const dialogRef = this.dialog.open(AdminRegisterFormPartBComponent, {
      width: '300px',
      disableClose : true,
      data: { admin : this.admin
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
