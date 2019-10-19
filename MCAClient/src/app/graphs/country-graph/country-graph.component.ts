import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-country-graph',
  templateUrl: './country-graph.component.html',
  styleUrls: ['./country-graph.component.css']
})
export class CountryGraphComponent implements OnInit {

  public chartType: string = 'pie';
  public chartDatasets  :Array<any> =[{
    data: [],label: 'Cyber Events' }
  ]
  
    public chartColors: Array<any> = [
      {
        backgroundColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 2,
      }
    ];
  
    public chartOptions: any = {
      scales:{
        yAxes:
          [{
            ticks: {
                min: 0,
               
            },
        }],
        
      },
      responsive: true,
      title: {
        display: true,
        text: 'Cyber events (according Country)'
    }
    };
    data: any[] = [];
    chartLabels: any[] = [];
  
    constructor(private apiService:ApiService) { }
  
    ngOnInit() {
  
      //Getting all the events
      //Create chart labels array according the country of the events witout duplicates and sort it.
      //Create the data array according filter of each country label.
      this.apiService.getEvents().subscribe(result =>{
        this.chartDatasets[0].data = [];
        this.chartLabels = result.map(event => event.country)
                                .filter((el,index,arr) => arr.indexOf(el) === index)
                                .sort((e1,e2)=>e1-e2);
        for(let i = 0 ; i < this.chartLabels.length; i++){
          this.chartDatasets[0].data[i] = result.filter(event => event.country == this.chartLabels[i]).length;
        }
      });
  
  
    }
}
