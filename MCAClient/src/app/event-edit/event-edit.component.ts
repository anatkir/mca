import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ApiService } from '../api.service';

//Event Edit/Add component Logic
@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.css']
})
export class EventEditComponent implements OnInit {
event = {}
  constructor(private apiService:ApiService,public dialogRef: MatDialogRef<EventEditComponent>,@Inject(MAT_DIALOG_DATA) public data:any)  {
    Object.assign(this.event ,this.data.el);
    console.log(this.event);
  }

  ngOnInit() {
  }

  //This function called when the user click on event edit/add
  //Make a request for event edit/add to the Server.
  confirm(){

    if(!this.data.editMode){
      this.apiService.addEvent(this.event).subscribe(result => {
        console.log(result);
        this.dialogRef.close();
      }, error => {

      });
    } else {
      this.apiService.updateEvent(this.event).subscribe(result => {
        console.log(result);
        this.dialogRef.close();
      }, error => {

      });
    }
  }

}
