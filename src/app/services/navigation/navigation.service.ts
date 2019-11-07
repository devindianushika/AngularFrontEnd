import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {


  profileClick : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor() { }

  // /**
  //  * get profileClick
  //  */
  // public get getProfileClick() : boolean{
  //   return this.profileClick;
  // }

  // /**
  //  * set setProfileClick(profileClick : boolean)  */
  // public set setProfileClick(profileClick : boolean) {
  //   this.profileClick = profileClick;
  // }


  setProfileClick(profileClick : boolean){
    this.profileClick.next(profileClick);
  }

  getProfileClick() : boolean{
    return this.profileClick.value;
  }

}
