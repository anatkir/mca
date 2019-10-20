import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { User } from '../user';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['FirstName', 'LastName', 'UserName', 'email','role','lastLogin','Actions'];
  dataSource : MatTableDataSource<User[]>;
  constructor(private apiService:ApiService,private authService:AuthService, private router:Router) {
    console.log(this.authService.isAdmin() === false);
    if(!this.authService.getCurrentUser() || !this.authService.isAdmin()){
      this.router.navigate(['events']);
    }
   }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(){
    this.apiService.getUsers().subscribe(result =>{
      this.dataSource = new MatTableDataSource(result);
    });
  }

  deleteUser(element){
    this.apiService.deleteUser(element._id).subscribe(result =>{
      this.getUsers();
    }, error => {

    });
  }

}
