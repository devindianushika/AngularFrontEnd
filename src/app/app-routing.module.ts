import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { LoginComponent } from '../app/components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './auth';
import { UserProfileComponent } from './components/user-profile/user-profile/user-profile.component';
import { AdministrationComponent } from './components/admin/administration/administration.component';
import { PeopleComponent } from './components/people/people.component';


const routes: Routes = [
  {path : 'login',component : LoginComponent},
  {path : '',component : DashboardComponent, canActivate : [AuthGuard],
children : [
  {path : 'profile',component : UserProfileComponent},
  {path : 'administration',component : AdministrationComponent},
  {path : 'home',component : HomeComponent},
  {path : 'people',component :PeopleComponent}
]},

  // {path : 'home',component : HomeComponent, canActivate : [AuthGuard]},

  // otherwise redirect to home
  { path: '**', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
