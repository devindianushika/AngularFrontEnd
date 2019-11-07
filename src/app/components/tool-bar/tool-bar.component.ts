import { Component, OnInit } from '@angular/core';
import { MatIconRegistry , MatIcon } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { NavigationService } from 'src/app/services/navigation/navigation.service';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.css']
})
export class ToolBarComponent implements OnInit {

  isAuthenticated : boolean;

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private authenticationService : AuthenticationService, private router: Router,
    private navigationService : NavigationService
  ){
    this.matIconRegistry.addSvgIcon(
      "audelia_logo",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/logos/Logo.svg")
    ).addSvgIcon("profile_icon",this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/profile_24px.svg"))
    .addSvgIcon("view_profile_icon",this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/View-Profile-36dp.svg"))
    .addSvgIcon("settings_icon",this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/settings-36dp.svg"))
    .addSvgIcon("logout_icon",this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/logout.svg"))
    .addSvgIcon("",this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/"));

    let user = authenticationService.currentUserValue;
    if(user && user.token){
      this.isAuthenticated = true;
    }else{
      this.isAuthenticated = false;
    }
  }

  ngOnInit() {
  }



  logout(){
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }


  profileView(){
      
  }

}
