import { Component, OnInit } from '@angular/core';
import { ExchangeRateService } from '../Service/exchange-rate.service';
import { Observable, Subscriber } from 'rxjs';
import {
  ExchangeRateItem,
  calculatedExchangeRates,
} from '../Model/exchnage-rate-model';
import { CurrencyServiceService } from '../Service/currency-service.service';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  ratesList: ExchangeRateItem;
  enteredAmount: number;
  baseCurrency = 'EUR';
  finalExchangesRates: calculatedExchangeRates[] = [];
  comparingCode: string;

  constructor(
    private exchangeRate: ExchangeRateService,
    private currencyService: CurrencyServiceService
  ) {}

  ngOnInit() {
    this.latestRates();
  }

  latestRates() {
    this.exchangeRate.getLatestrates().subscribe((list) => {
      if (list !== null) {
        this.ratesList = list;
        this.calculateRates(1);
      }
    });
  }

  calculateRates(amount: number) {
    let data = this.currencyService.currencies();
    for (let i = 0; i < data.length; i++) {
      this.comparingCode = data[i].toString();
      var rateValue = this.ratesList.rates[this.comparingCode];
       var calculatedValues:calculatedExchangeRates = {
        currencyCode: this.comparingCode,
        exchangeValue: rateValue,
        receivingAmount: amount * rateValue,
        reverseRate: 1 / rateValue ,
      };
      this.finalExchangesRates.push(calculatedValues);
    }
  }
  calculateExchangerates(event){
    console.log(this.enteredAmount);
    this.finalExchangesRates = [];
    this.calculateRates(this.enteredAmount);

  }

}


