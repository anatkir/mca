import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUser:any;

  //Checks if there is logged in user , if exist - save it to currentUser variable.
  constructor(private router:Router){
    if(sessionStorage.getItem('User')){
      this.currentUser = JSON.parse(sessionStorage.getItem('User'));
    };
  }

  //This method check if the user need to be blocked or not.
  //After 3 incorrect logins , the user blocked for 20 seconds.
  //Every incorrect attempt saved to sessionStorage for remember the last incorrect time.
  failLogin() {
    if(sessionStorage.getItem('FailLogin')){
      
      let failLoginDetails = JSON.parse(sessionStorage.getItem('FailLogin'));
      if(failLoginDetails.counter >= 3){
        if(new Date().getTime() - new Date(failLoginDetails.date).getTime()  >= 20000){
          sessionStorage.removeItem('FailLogin');
          return false;
        }
        return true;
      } 

      failLoginDetails.counter = failLoginDetails.counter + 1;
      failLoginDetails.date = new Date();
      sessionStorage.setItem('FailLogin', JSON.stringify(failLoginDetails));
      
    } else {
      sessionStorage.setItem('FailLogin', JSON.stringify({counter:1,date:new Date()}));
      return false;
    }
  }

    //Return the current logged in user.
  getCurrentUser() {
      return this.currentUser;
  }  

  //Saving the user details into the sessionStorage and assign it to currentUser variable.
  loginUser(user: any) {
    sessionStorage.setItem('User', JSON.stringify(user));
    this.currentUser = user;
  }

  //Removing the user details from sessionStorage and navigate to login page.
  logout(){
    sessionStorage.removeItem('User');
    this.currentUser = undefined;
    this.router.navigate(['']);
  }

  //Return if current user is an admin or not.
  isAdmin(){
    return this.currentUser && this.currentUser.role == 'Admin';
  }

}
