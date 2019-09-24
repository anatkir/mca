import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YearGraphComponent } from './year-graph.component';

describe('YearGraphComponent', () => {
  let component: YearGraphComponent;
  let fixture: ComponentFixture<YearGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YearGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YearGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
