import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Teacher } from 'src/app/modules/Teacher';
import { AppConstants } from 'src/app/modules/AppConstants';
import { FormControl, Validators, ValidatorFn ,AbstractControl , FormGroupDirective , NgForm } from '@angular/forms';
import { Admin } from 'src/app/modules/Admin';
import { Student } from 'src/app/modules/Student';
import { Parent } from 'src/app/modules/Parent';

const httpOptions = {
  headers : new HttpHeaders({
    'Content-Type' : 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  backendurl : string;

  private teacherExistsVal : boolean;

  private teacherExistsArr : BehaviorSubject<boolean>;

  constructor(private http : HttpClient) { 
    this.backendurl = `${AppConstants.BACKEND_URL}${"registration"}`;
    this.teacherExistsArr = new BehaviorSubject<boolean>(false);
    this.teacherExistsVal = false;
  }

  registerTeacher(teacher : Teacher) : Observable<Teacher> {
    teacher.profile_uri = `${teacher.fullName}${teacher.gender}${teacher.registrationNumber}${" .jpeg"}`;
    const url = `${this.backendurl}/${"registerTeacher"}`;
    return this.http.post<Teacher>(url,teacher,httpOptions);
  }

  teacherExists(registrationNumber : string)  {
    const url = `${this.backendurl}/${"teacherExists?registrationNumber=T"}${registrationNumber}`;
      return this.http.get(url);
  }

  registerAdmin(admin : Admin) : Observable<Admin> {
    admin.profile_uri = `${admin.fullName}${admin.gender}${admin.registrationNumber}${" .jpeg"}`;
    const url = `${this.backendurl}/${"registerAdmin"}`;
    return this.http.post<Admin>(url,admin,httpOptions);
  }


  adminExists(registrationNumber : string)  {
    
    const url = `${this.backendurl}/${"adminExists?registrationNumber=A"}${registrationNumber}`;
      return this.http.get(url);
  }

  registerStudent(student : Student) : Observable<Student> {
  student.profile_uri = `${student.fullName}${student.gender}${student.registrationNumber}${" .jpeg"}`;
    const url = `${this.backendurl}/${"registerStudent"}`;
    return this.http.post<Student>(url,student,httpOptions);
  }


  studentExists(registrationNumber : string)  {
    const url = `${this.backendurl}/${"studentExists?registrationNumber=S"}${registrationNumber}`;
      return this.http.get(url);
  }

  registerParent(parent : Parent) : Observable<Parent> {
    parent.profile_uri = `${parent.fullName}${parent.gender}${parent.registrationNumber}${" .jpeg"}`;
    const url = `${this.backendurl}/${"registerParent"}`;
    return this.http.post<Parent>(url,parent,httpOptions);
  }

  parentExists(registrationNumber : string)  {
    const url = `${this.backendurl}/${"parentExists?registrationNumber=P"}${registrationNumber}`;
      return this.http.get(url);
  }

  parentExistsA(registrationNumber : string)  {
    const url = `${this.backendurl}/${"parentExists?registrationNumber="}${registrationNumber}`;
      return this.http.get(url);
  }

  getAllParents() : Observable<Parent[]>{
    const url = `${this.backendurl}/${"getAllParents"}`;
      return this.http.get<Parent[]>(url);
  }
}
