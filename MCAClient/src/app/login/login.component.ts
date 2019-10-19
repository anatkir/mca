import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user:User = {} as User
  showSpinner;
  errorMessage: string;

  //Navigate to the events page when user is logged in.
  constructor(private apiService:ApiService, private authService:AuthService,private router:Router) { 
    if(this.authService.getCurrentUser()){
      this.router.navigate(['events']);
    }
  }

  ngOnInit() {
  }

  //Called when login request made.
  login(){
    this.errorMessage = undefined;
    this.showSpinner = true;
    //Make a request to the API Service for verify login details.
    this.apiService.loginUser(this.user).subscribe(result => {
      console.log(result);
      this.showSpinner = false;
      this.authService.loginUser(result);
      this.router.navigate(['events']);
    },error => {
      this.errorMessage = 'Username or Password are incorrect!';
      this.showSpinner = false;
    });
  }

}
