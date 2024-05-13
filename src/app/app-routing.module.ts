import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { SellitemformComponent } from './sellitemform/sellitemform.component';
import { LoginComponent } from './login/login.component';
import { FeedbackComponent } from './feedback/feedback.component';

import { UserprofileComponent } from './userprofile/userprofile.component';
import { RegisterComponent } from './register/register.component';
import { AnalyticsComponent } from './analytics/analytics.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    title: 'Login Page'
  },
  {
    path:'register',
    component:RegisterComponent,
    title:'register-form'
  }
  ,
  {
    path: 'home',
    component: HomeComponent,
    title: 'Home page'
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
    title: 'Home details'
  },
  {
    path: 'sell',
    component: SellitemformComponent,
    title: 'Sell Form'
  },
  {
    path:'feedback/:username', 
    component: FeedbackComponent , 
    title:"feedback form"
  },
  {
    path:'userprofile',
    component: UserprofileComponent,
    title:"purchases form"
  },
  {
    path:'analytics', 
    component: AnalyticsComponent , 
    title:"Analytics and Reporting"
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
