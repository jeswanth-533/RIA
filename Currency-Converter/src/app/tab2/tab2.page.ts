import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CurrencyServiceService } from '../Service/currency-service.service';
import { ExchangeRateService } from '../Service/exchange-rate.service';
import { DatePipe } from '@angular/common';
import { Chart } from 'chart.js';
import { Subscription } from 'rxjs';

export interface chartData {
  date: string;
  rateInfo: rate;
}

export interface rate {
  symbol: string;
  rate: string;
}

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  betweenDatesResponse: any;
  currencySymbols: String[];
  selectedCurrencySymbol: string;
  isTimePeriodselected: boolean = false;
  baseCurrency = 'EUR';
  startDate: string;
  dateArray: string[] = [];
  ratesArray: number[] = [];
  subscription: Subscription;
  @ViewChild('lineCanvas') private lineCanvas: ElementRef;
  lineChart: any;
  segment: string;
  customAlertOptions: any = {
    header: 'Choose Currency',
    translucent: true,
  };
  constructor(
    private exchangeRateService: ExchangeRateService,
    private currencyService: CurrencyServiceService,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.currencySymbols = this.currencyService.currencies();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getCurrencySymbol(event) {
    this.selectedCurrencySymbol = event.target.value;
    this.segment = '';
    // this.lineChartMethod([],[],'');
  }

  segmentChanged(event?: any) {
    var initialDate, endDate, Symbol;
    Symbol = this.selectedCurrencySymbol;
    var date = new Date();
    if (event.target.value === '1month') {
      endDate = this.datePipe.transform(date, 'yyyy-MM-dd');
      initialDate = this.datePipe.transform(
        date.setDate(date.getDate() - 30),
        'yyyy-MM-dd'
      );
    } else if (event.target.value === '1year') {
      endDate = this.datePipe.transform(date, 'yyyy-MM-dd');
      initialDate = this.datePipe.transform(
        date.setFullYear(date.getFullYear() - 1),
        'yyyy-MM-dd'
      );
    } else if (event.target.value === '1day') {
      endDate = this.datePipe.transform(date, 'yyyy-MM-dd');
      initialDate = this.datePipe.transform(
        date.setDate(date.getDate() - 1),
        'yyyy-MM-dd'
      );
    }
    this.callToExchangeservice(initialDate, endDate, Symbol);
  }

  callToExchangeservice(startdate: Date, endDate: Date, symbol: string) {
    this.dateArray = [];
    this.ratesArray = [];
    this.subscription = this.exchangeRateService
      .getExchangeRatebyTimePeriod(startdate, endDate, symbol)
      .subscribe((response) => {
        if (response !== null) {
          this.isTimePeriodselected = true;
          var dates = Object.keys(response.rates);
          dates.forEach((data) => this.dateArray.push(data));
          this.dateArray.forEach((date) => {
            var x = response.rates[date];
            this.ratesArray.push(x[symbol]);
          });
        }
        this.lineChartMethod(this.dateArray, this.ratesArray, symbol);
      });
  }


  // This method will take the X and Y datapoints to plot in the chart of type Line.
  lineChartMethod(xDataPoints: any, yDataPoints: any, currencySymbol: string) {
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: xDataPoints,
        datasets: [
          {
            label: 'Exchange rate of ' + currencySymbol,
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
            data: yDataPoints,
            spanGaps: false,
          },
        ],
      },
    });
    this.lineChart.render();
  }
}
