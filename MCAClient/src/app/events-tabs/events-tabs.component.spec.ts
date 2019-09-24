import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsTabsComponent } from './events-tabs.component';

describe('EventsTabsComponent', () => {
  let component: EventsTabsComponent;
  let fixture: ComponentFixture<EventsTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
