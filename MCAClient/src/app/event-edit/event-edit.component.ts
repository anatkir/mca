import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ApiService } from '../api.service';

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

  confirm(){
    if(!this.data.editMode){
      this.apiService.addEvent(this.event).subscribe(result => {
        console.log(result);
      }, error => {

      });
    }
  }

}
