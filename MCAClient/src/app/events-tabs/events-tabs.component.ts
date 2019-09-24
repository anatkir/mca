import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-events-tabs',
  templateUrl: './events-tabs.component.html',
  styleUrls: ['./events-tabs.component.css']
})
export class EventsTabsComponent implements OnInit {
  active = 'year';
  constructor() { }

  ngOnInit() {
  }

}
