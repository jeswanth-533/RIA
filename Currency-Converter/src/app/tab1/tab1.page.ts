import { Component, OnInit } from '@angular/core';
import { ExchangeRateService } from '../Service/exchange-rate.service';
import { Observable, Subscriber, Subscription } from 'rxjs';
import {
  ExchangeRateItem,
  calculatedExchangeRates,
} from '../Model/exchnage-rate-model';
import { CurrencyServiceService } from '../Service/currency-service.service';

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
  currentDate: string;
  subscription: Subscription;
  constructor(
    private exchangeRate: ExchangeRateService,
    private currencyService: CurrencyServiceService
  ) {}

  ngOnInit() {
    this.latestRates();
  }

  latestRates() {
    var date = new Date();
    this.subscription = this.exchangeRate
      .getLatestrates(date)
      .subscribe((list) => {
        if (list !== null) {
          this.ratesList = list;
          this.calculateRates(1);
        }
      });
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  //This method will take the entered EUR amount and will calculate the rates for all currencies.
  calculateRates(amount: number) {
    amount = amount | 1;
    let data = this.currencyService.currencies();
    for (let i = 0; i < data.length; i++) {
      this.comparingCode = data[i].toString();
      var rateValue = this.ratesList.rates[this.comparingCode];
      var calculatedValues: calculatedExchangeRates = {
        currencyCode: this.comparingCode,
        exchangeValue: rateValue,
        receivingAmount: amount * rateValue,
        reverseRate: 1 / rateValue,
      };
      this.finalExchangesRates.push(calculatedValues);
    }
  }

  calculateExchangerates(event) {
    this.finalExchangesRates = [];
    this.calculateRates(this.enteredAmount);
  }
}
