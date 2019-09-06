import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user:User = {} as User
  showSpinner;
  constructor(private apiService:ApiService) { }

  ngOnInit() {
  }

  login(){
    this.showSpinner = true;
    this.apiService.loginUser(this.user).subscribe(result => {
      console.log(result);
      this.showSpinner = false;
    });
  }

}
