import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CurrencyServiceService {
  inputAmount:number;
  constructor() {}

  public currencies() {
    let currenciesList: String[] = [
      'AUD',
      'BGN',
      'BRL',
      'CAD',
      'CHF',
      'CNY',
      'CZK',
      'DKK',
      'GBP',
      'HKD',
      'HRK',
      'HUF',
      'IDR',
      'ILS',
      'INR',
      'ISK',
      'JPY',
      'KRW',
      'MXN',
      'MYR',
      'NOK',
      'NZD',
      'PHP',
      'PLN',
      'RON',
      'RUB',
      'SEK',
      'SGD',
      'THB',
      'TRY',
      'USD',
      'ZAR',
    ];
    return currenciesList;
  }

  public setInputValue(value:number){
    this.inputAmount = value;
  }

  public getInputValue(){
    return this.inputAmount;
  }
}
