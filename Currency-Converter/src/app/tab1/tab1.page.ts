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
    //this.calculateRates();
  }

  latestRates() {
    let data = this.currencyService.currencies();
    this.exchangeRate.getLatestrates().subscribe((list) => {
      if (list !== null) {
        this.ratesList = list;
        for (let i = 0; i < data.length; i++) {
          this.comparingCode = data[i].toString();
          var rateValue = this.ratesList.rates[this.comparingCode];
           var calculatedValues:calculatedExchangeRates = {
            currencyCode: this.comparingCode,
            exchangeValue: rateValue === undefined? 100:rateValue,
            receivingAmount: 1 * rateValue,
            reverseRate: 1 / rateValue ,
          };
          this.finalExchangesRates.push(calculatedValues);
        }
      }
    });
  }

  calculateRates(amount?: number) {}
}


