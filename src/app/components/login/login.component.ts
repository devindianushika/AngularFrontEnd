import { Component, OnInit , EventEmitter ,Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { first } from 'rxjs/operators';
import { MatIconRegistry , MatIcon } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // @Output() isAuth : EventEmitter<boolean> = new EventEmitter();

  username : string;
  password : string;

  loading = false;
  returnUrl: string;
  error = '';
  loggedIn = false;
  try : number;
  hide : true;

  constructor(private authenticationService : AuthenticationService,private route: ActivatedRoute,
    private router: Router, private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer) {

      this.matIconRegistry.addSvgIcon(
        "hide",
        this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/hide_24dp.svg")
      ).
      addSvgIcon(
        "show",
        this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/show_24dp.svg")
      );

      this.hide = true;

      if (this.authenticationService.currentUserValue) { 
        this.router.navigate(['/home']);
    }

    this.try = 0;

  }

  ngOnInit() {
    // this.isAuth.emit(true);
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
  }

  onLogin(){
    console.log(this.username);
    console.log(this.password);

    this.loading = true;
        this.authenticationService.login(this.username, this.password)
            .pipe(first())
            .subscribe(
                data => {
                    this.loggedIn = true;
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.error = error;
                    this.loading = false;
                    this.loggedIn = false;
                    this.try = this.try + 1;
                    console.log("Error ==== ");
                    console.log(error);
                });
   
  }


  getLoginFailedMessage(){
    return "Login Failed!";
  }

}
