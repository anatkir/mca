import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

   user:User = {} as User;

  constructor(private apiService:ApiService) { }

  ngOnInit() {
  }

  register(){
    this.user.role = 'User';
    this.apiService.postRegister(this.user).subscribe(result => console.log(result));
  }

}
