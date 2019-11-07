import { Component, OnInit, EventEmitter ,Output, Input } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { DashboardNavigation } from 'src/app/modules/DashboardNavigation.enum';
import { UserType } from 'src/app/modules/UserType.enum';
import { Router } from '@angular/router';
import { NavigationService } from 'src/app/services/navigation/navigation.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  homeClick : boolean;
  peopleClick : boolean;
  newsClick : boolean;
  articlesClick : boolean;
  myClassesClick : boolean;
  adminstrationClick : boolean;
  myChildrenClick : boolean;
  approvalsClick : boolean;
  profileClick : boolean;

  // @Input()
  // profileClick : boolean;

  navView : String;
  userType : UserType;

  // @Output() isAuth : EventEmitter<boolean> = new EventEmitter();

  constructor(private authenticationService : AuthenticationService,private router : Router,
    private navigationService : NavigationService) { 
    this.setNavigationHoldView(true,false,false,false,false,false,false,false,false);
    this.navView = DashboardNavigation[DashboardNavigation.HOME];

    let user = authenticationService.currentUserValue;
    this.userType = user.userType;
    console.log(user.object);
    console.log(user.token);
    console.log(user.userType);

  }

  ngOnInit() {
    // this.isAuth.emit(true);
    
  }

  // home
  setClassHome() {

    let classes = {
      "is-clicked-home" : this.homeClick
    }

    return classes;
  }

  // people
  setClassPeople() {

    let classes = {
      "is-clicked-people" : this.peopleClick
    }

    return classes;
  }

  // news
  setClassNews() {

    let classes = {
      "is-clicked-news" : this.newsClick
    }

    return classes;
  }

  // articles
  setClassArticles() {

    let classes = {
      "is-clicked-articles" : this.articlesClick
    }

    return classes;
  }

  // myClasses
  setClassMyClasses() {

    let classes = {
      "is-clicked-my-classes" : this.myClassesClick
    }

    return classes;
  }

  // myChildren
  setClassMyChildren() {

    let classes = {
      "is-clicked-my-children" : this.myChildrenClick
    }

    return classes;
  }

  // approvals
  setClassApprovals() {

    let classes = {
      "is-clicked-approvals" : this.approvalsClick
    }

    return classes;
  }

  // administration
  setClassAdministration() {

    let classes = {
      "is-clicked-adminstration" : this.adminstrationClick
    }

    return classes;
  }

  onHomeClick() {
    
    this.setNavigationHoldView(true,false,false,false,false,false,false,false,false);
    this.navView = DashboardNavigation[DashboardNavigation.HOME];
    
  }

  onPeopleClick() {
    
    this.setNavigationHoldView(false,true,false,false,false,false,false,false,false);
    this.navView = DashboardNavigation[DashboardNavigation.PEOPLE];
  
  }

  onNewsClick() {
    
    this.setNavigationHoldView(false,false,true,false,false,false,false,false,false);
    this.navView = DashboardNavigation[DashboardNavigation.NEWS];
   
  }

  onArticlesClick() {
    
    this.setNavigationHoldView(false,false,false,true,false,false,false,false,false);
    this.navView = DashboardNavigation[DashboardNavigation.ARTICLES];
   
  }

  /////////////

  onMyClassesClick() {
    
    this.setNavigationHoldView(false,false,false,false,true,false,false,false,false);
    this.navView = DashboardNavigation[DashboardNavigation.MY_CLASSES];
    
  }

  onAdministrationClick() {
    
    this.setNavigationHoldView(false,false,false,false,false,true,false,false,false);
    this.navView = DashboardNavigation[DashboardNavigation.ADMINISTRATION];
 
  }

  

  onMyChildrenClick() {
    
    this.setNavigationHoldView(false,false,false,false,false,false,true,false,false);
    this.navView = DashboardNavigation[DashboardNavigation.MY_CHILDREN];
    
  }

  onApprovalsClick() {
    
    this.setNavigationHoldView(false,false,false,false,false,false,false,true,false);
    this.navView = DashboardNavigation[DashboardNavigation.APPROVALS];
  
  }

  onProfileViewClick() {
    
    this.setNavigationHoldView(false,false,false,false,false,false,false,false,true);
    this.navView = DashboardNavigation[DashboardNavigation.PROFILE];
  }

  setNavigationHoldView(
    homeClick : boolean,
    peopleClick : boolean,
    newsClick : boolean,
    articlesClick : boolean,
    myClassesClick : boolean,
    adminstrationClick : boolean,
    myChildrenClick : boolean,
    approvalsClick : boolean,profileClick : boolean){
    this.homeClick = homeClick;
      this.newsClick = newsClick;
      this.articlesClick = articlesClick;
      this.myClassesClick = myClassesClick;
      this.peopleClick = peopleClick;
      this.adminstrationClick = adminstrationClick;
      this.myChildrenClick = myChildrenClick;
      this.approvalsClick = approvalsClick;
      this.profileClick = profileClick;
  }

}
