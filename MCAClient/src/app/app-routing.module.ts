import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EventsTabsComponent } from './events-tabs/events-tabs.component';
import { UsersComponent } from './users/users.component';
import { OverviewComponent } from './overview/overview.component';


const routes: Routes = [{path:"",component:LoginComponent},
                        {path:"events",component:EventsTabsComponent} ,
                        {path:"register",component:RegisterComponent},
                      {path:"users",component:UsersComponent},
                      {path:"overview",component:OverviewComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
