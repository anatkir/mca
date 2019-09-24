import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  getCurrentUser() {
    return this.currentUser;
  }

  private currentUser:any;

  constructor(private router:Router){
    if(sessionStorage.getItem('User')){
      this.currentUser = JSON.parse(sessionStorage.getItem('User'));
    };
  }

  loginUser(user: any) {
    sessionStorage.setItem('User', JSON.stringify(user));
    this.currentUser = user;
  }

  logout(){
    sessionStorage.removeItem('User');
    this.currentUser = undefined;
    this.router.navigate(['']);
  }

  isAdmin(){
    return this.currentUser && this.currentUser.role == 'Admin';
  }

}
