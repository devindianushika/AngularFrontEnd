import { Component, OnInit } from '@angular/core';
import { FilecontrollerService } from 'src/app/services/filecontroller/filecontroller.service';
import { ImageDTO } from 'src/app/modules/ImageDTO';
import { stringify } from 'querystring';
import { ImageType } from 'src/app/modules/ImageType.enum';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { UserType } from 'src/app/modules/UserType.enum';
import { Admin } from 'src/app/modules/Admin';
import { Parent } from 'src/app/modules/Parent';
import { Teacher } from 'src/app/modules/Teacher';
import { Student } from 'src/app/modules/Student';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  imageUri : string;

  base64textString : string;
  imageDTO : ImageDTO;

  user : Object
  userType : UserType;

  admin : Admin;
  student : Student;
  parent : Parent;
  teacher : Teacher;


  constructor(private fileContoller : FilecontrollerService,private authService : AuthenticationService) {
      
    this.userType = authService.currentUserValue.userType;

    console.log(this.userType);

    
    switch(this.userType.toString()){
      
      case UserType[UserType.ADMIN]:
          this.admin = JSON.parse(JSON.stringify(authService.currentUserValue.object));
        break;
        case UserType[UserType.PARENT]:
            this.parent = JSON.parse(JSON.stringify(authService.currentUserValue.object));
          break;
          case UserType[UserType.STUDENT]:
              this.student = JSON.parse(JSON.stringify(authService.currentUserValue.object));
            break;
            case UserType[UserType.TEACHER]:
                this.teacher = JSON.parse(JSON.stringify(authService.currentUserValue.object));
              break;             
    }
      
        
  
   }



  ngOnInit() {
  }

  // assets/img/faces/face-3.jpg

  loadImage() : void {

  }

  imageUpload(event){
    var files = event.target.files;
      var file = files[0];
    
    if (files && file) {
        var reader = new FileReader();

        reader.onload =this._handleReaderLoaded.bind(this);

        reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
           this.base64textString= btoa(binaryString);
           console.log(this.base64textString);

           this.imageDTO = new ImageDTO();
            this.imageDTO.file = this.base64textString;

            switch(this.userType.toString()){
              case UserType[UserType.ADMIN]:
                  this.imageDTO.imageType = ImageType.PROFILE_ADMIN;
                  this.imageDTO.fileName = `${this.admin.fullName}${this.admin.gender}${this.admin.registrationNumber}${" .jpeg"}`;
                break;
              case UserType[UserType.PARENT]:
                  this.imageDTO.imageType = ImageType.PROFILE_PARENT;
                  this.imageDTO.fileName = `${this.parent.fullName}${this.parent.gender}${this.parent.registrationNumber}${" .jpeg"}`;
                break;
              case UserType[UserType.STUDENT]:
                  this.imageDTO.imageType = ImageType.PROFILE_STUDENT;
                  this.imageDTO.fileName = `${this.student.fullName}${this.student.gender}${this.student.registrationNumber}${" .jpeg"}`;
                break;
              case UserType[UserType.TEACHER]:
                  this.imageDTO.imageType = ImageType.PROFILE_TEACHER;
                  this.imageDTO.fileName = `${this.teacher.fullName}${this.teacher.gender}${this.teacher.registrationNumber}${" .jpeg"}`;
                break;
            }
    

           
            console.log("----------=========");
            console.log(this.imageDTO.fileName);


      this.fileContoller.uploadProfileImage(this.imageDTO).subscribe(x=> {
        console.log(x);
      });
   }

}
