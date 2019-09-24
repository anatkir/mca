import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { AuthService } from '../auth.service';
import { EventEditComponent } from '../event-edit/event-edit.component';

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
  dataSource : MatTableDataSource<Event[]>;
  comment;
  comments: any[];
  showSpinner: boolean;

  constructor(private apiService: ApiService,private auth:AuthService, private dialog:MatDialog) { }

  ngOnInit() {
    this.getEvents();
  }

  getEvents(){
    this.apiService.getEvents().subscribe(result =>{
      this.dataSource = new MatTableDataSource(result);
    });
  }

  addComment(id){
    this.apiService.addEventComment({user:this.auth.getCurrentUser().firstName,eventId:id, comment:this.comment}).subscribe(result => {
      this.getComments(id);
    });

    
  }

  edit(element){
    const dialogRef = this.dialog.open(EventEditComponent, {
      width: '250px',
      data : {el : element, editMode: true}
    });

    dialogRef.afterClosed().subscribe(result =>{
      this.getEvents();
    });
  }

  addEvent(){
    const dialogRef = this.dialog.open(EventEditComponent, {
      width: '250px',
    data : {editMode: false}
    });

    dialogRef.afterClosed().subscribe(result =>{
      this.getEvents();
    });
  }

  deleteEvent(element){
    this.apiService.deleteEvent(element._id).subscribe(result=>{
      this.getEvents();
    });
  }

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
