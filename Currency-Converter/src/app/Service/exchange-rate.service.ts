import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExchangeRateItem } from '../Model/exchnage-rate-model';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ExchangeRateService {
  formattedDate: string;
  latestRates: string = 'https://api.exchangeratesapi.io/latest';
  ratesForParticularDate: string = 'https://api.exchangeratesapi.io/';
  ratesBetweendates: string =
    'https://api.exchangeratesapi.io/history?start_at=2018-01-01&end_at=2018-01-01';
  rateByTimePeriodAndSymbol: string =
    'https://api.exchangeratesapi.io/history?';
  constructor(private httpClient: HttpClient, private dateFormat: DatePipe) {}

  public getLatestrates(date: Date): Observable<any> {
    this.formattedDate = this.dateFormat.transform(date, 'yyyy-MM-dd');
    var url = this.ratesForParticularDate + this.formattedDate;
    return this.httpClient.get<ExchangeRateItem>(url);
  }

  public getQuoteByDifferentCurrency(): Observable<any> {
    return this.httpClient.get<any>(this.ratesBetweendates);
  }

  public getExchangeRatebyTimePeriod(
    startDate: Date,
    endDate: Date,
    symbol: string
  ): Observable<any> {
    var finalUrl =
      this.rateByTimePeriodAndSymbol +
      'start_at=' +
      startDate +
      '&' +
      'end_at=' +
      endDate +
      '&symbols=' +
      symbol;
    return this.httpClient.get<any>(finalUrl);
  }
}
