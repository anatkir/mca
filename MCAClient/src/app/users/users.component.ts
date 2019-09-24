import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { User } from '../user';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['FirstName', 'LastName', 'UserName', 'email','role'];
  dataSource : MatTableDataSource<User[]>;
  constructor(private apiService:ApiService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(){
    this.apiService.getUsers().subscribe(result =>{
      this.dataSource = new MatTableDataSource(result);
    });
  }

}
