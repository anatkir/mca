import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { AuthService } from '../auth.service';
import { EventEditComponent } from '../event-edit/event-edit.component';
import { Router } from '@angular/router';

//Interface for Event model.
export interface Event {
  _id;
  eventName: string;
  system: string;
  attacker: string;
  victim: string;
  attackTarget:string;
  startDate:Date;
  endDate:Date;
}

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])]
})
export class EventsComponent implements OnInit {

  displayedColumns: string[] = ['eventName', 'system', 'attacker', 'victim','target', 'startDate','endDate','actions'];
  dataSource : MatTableDataSource<Event>;
  comment;
  comments: any[];
  showSpinner: boolean;
  filterField: any;

  constructor(private router:Router, private apiService: ApiService,private auth:AuthService, private dialog:MatDialog, private authService:AuthService) { 
    this.dataSource = new MatTableDataSource([]);
    if(!this.authService.getCurrentUser()){
      this.router.navigate(['']);
    }
  }

  ngOnInit() {
    this.getEvents();

    //Called when key pressed on search input
    //Filtering the data according the field and the value
    this.dataSource.filterPredicate = function(data:Event, filter: any): boolean {
      let parsedFilter = JSON.parse(filter);
      return data[parsedFilter.field].toLowerCase().includes(parsedFilter.value.toLowerCase());
  };
   
  }

  //Make a request to the API Service for fetching all the events and after that updating the table datasource.
  getEvents(){
    this.apiService.getEvents().subscribe(result =>{
      this.dataSource.data = result;
 
    });
  }

  //Make a request to the API Service for adding new comment.
  addComment(id){
    this.apiService.addEventComment({user:this.auth.getCurrentUser().firstName,eventId:id, comment:this.comment}).subscribe(result => {
      this.getComments(id);
    });

    
  }

  changeFilter($event){
    this.filterField = $event.value;
  }

  applyFilter(value){
    this.dataSource.filter = JSON.stringify({value : value, field:this.filterField});
  }


  //Called on event edit , opens new dialog and passing the element.
  edit(element){
    const dialogRef = this.dialog.open(EventEditComponent, {
      width: '500px',
      data : {el : element, editMode: true}
    });

    dialogRef.afterClosed().subscribe(result =>{
      this.getEvents();
    });
  }

  //Called on event add , opens new dialog and passing the element.
  addEvent(){
    const dialogRef = this.dialog.open(EventEditComponent, {
      width: '500px',
    data : {editMode: false}
    });

    dialogRef.afterClosed().subscribe(result =>{
      this.getEvents();
    });
  }

  //Make a request to the API Service for delete the requested event.
  deleteEvent(element){
    this.apiService.deleteEvent(element._id).subscribe(result=>{
      this.getEvents();
    });
  }

  //Make a request to the API Service for delete the requested comment.
  deleteComment(commentId, eventId){
    this.apiService.deleteComment(commentId).subscribe(result=>{
      this.getComments(eventId);
    });
  }


  //Make a request to the API Service for getting all the comments for a specific event.
  getComments(id){
    this.showSpinner = true;
    console.log(id);
    this.comments = [];
    this.apiService.getComments(id).subscribe(result => {
      this.showSpinner = false;
      this.comments = result;
      console.log(result);
    });
  }

  

}
