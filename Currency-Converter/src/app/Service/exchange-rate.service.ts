import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExchangeRateItem } from '../Model/exchnage-rate-model';

// export interface latestRates{
//   base:string;
//   date:string;
//   rates:currencyRates;
// }
// export interface currencyRates{
//   currency:string;
//   currencyRate:number;
// }

@Injectable({
  providedIn: 'root',
})
export class ExchangeRateService {
  latestRates: string = 'https://api.exchangeratesapi.io/latest';
  constructor(private httpClient: HttpClient) {}

  public getLatestrates(): Observable<any> {
    return this.httpClient.get<ExchangeRateItem>(this.latestRates);
  }

  public getQuoteByDifferentCurrency(): Observable<any> {
    return;
  }
}
