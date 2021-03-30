import { Component, OnInit } from '@angular/core';
import { ExchangeRateService } from '../Service/exchange-rate.service';
import { Observable, Subscriber } from 'rxjs';

export interface rates{
  currency:string;
  exchangeRate:number;
} 

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})

export class Tab1Page implements OnInit {
  ratesList: any;
  amountEntered: number;
  constructor(private exchangeRate: ExchangeRateService) {}

  ngOnInit() {
    this.exchangeRate.getLatestrates().subscribe((list) => {
      this.ratesList = list;
    });
    this.callRates();
  }

  callRates(event?: any, value?: number) {
    value = value > 1 ? value:1; 
    // this.rate.push(this.ratesList.rates);
    console.log(this.ratesList.rates);
  }
}
