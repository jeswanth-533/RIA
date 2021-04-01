import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExploreContainerComponent implements OnInit,AfterViewInit {
   @Input() xDataPoints: any;
   @Input() currencySymbol:string;
   @Input() yDataPoints:any;
  @ViewChild('lineCanvas') private lineCanvas: ElementRef;
  lineChart: any;
  xaxisLabels:string[];
  yaxisLabels:string[];
  showgraph:boolean;

  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    this.lineChartMethod();
  }

  lineChartMethod(){
    debugger;
      this.lineChart = new Chart(this.lineCanvas.nativeElement, {
        type: 'line',
        data: {
          labels: this.xDataPoints,
          datasets: [
            {
              label: 'Exchange rate of ' + this.currencySymbol ,
              fill: false,
              lineTension: 0.1,
              backgroundColor: 'rgba(75,192,192,0.4)',
              borderColor: 'rgba(75,192,192,1)',
              borderDash: [],
              borderDashOffset: 0.0,
              pointBorderColor: 'rgba(75,192,192,1)',
              pointBackgroundColor: '#fff',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: 'rgba(75,192,192,1)',
              pointHoverBorderColor: 'rgba(220,220,220,1)',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: this.yDataPoints,
              spanGaps: false,
            }
          ]
        }
      });
    }
}
