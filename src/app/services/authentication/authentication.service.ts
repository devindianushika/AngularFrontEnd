import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationResponse } from '../../modules/AuthenticationResponse';
import { AuthenticationRequest } from '../../modules/AuthenticationRequest';
import { AppConstants } from 'src/app/modules/AppConstants';

const httpOptions = {
  headers : new HttpHeaders({
    'Content-Type' : 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  authUrl : string = `${AppConstants.BACKEND_URL}${"authentication"}`;
  auth : string = "auth";

  private currentUserSubject: BehaviorSubject<AuthenticationResponse>;
  public currentUser: Observable<AuthenticationResponse>;

  constructor(private http: HttpClient) {
      this.currentUserSubject = new BehaviorSubject<AuthenticationResponse>(JSON.parse(localStorage.getItem('currentUser')));
      this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): AuthenticationResponse {
      return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    console.log("Login Called!");
    const url = `${this.authUrl}/${this.auth}`;
      return this.http.post<AuthenticationResponse>(url,{username,password},httpOptions)
          .pipe(map(user => {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('currentUser', JSON.stringify(user));
              this.currentUserSubject.next(user);
              console.log(user);
              return user;
          }));
  
  }

  logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
      
  }
}
