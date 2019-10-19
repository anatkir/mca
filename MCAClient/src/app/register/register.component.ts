import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

   user:User = {} as User;
  showSpinner: boolean;
  errorMessage: string;

  constructor(private apiService:ApiService, private router:Router) { }

  ngOnInit() {
  }

  //Called when user called on register button.
  register(){
    this.errorMessage = undefined;
    this.showSpinner = true;
    this.user.role = 'User';
    this.apiService.postRegister(this.user).subscribe(
      result => {
        this.showSpinner = false;
        this.router.navigate(['']);
      },error=>
      {
      this.errorMessage = error.error.error;
      this.showSpinner = false;
    });
  }

}
