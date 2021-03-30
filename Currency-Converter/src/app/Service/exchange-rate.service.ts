import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { Observable } from 'rxjs';
import {DatePipe} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ExchangeRateService {
latestRates:string = "https://api.exchangeratesapi.io/latest";
ratesForAnyDay:string = "https://api.exchangeratesapi.io/";
ratesForYear:string = "https://api.exchangeratesapi.io/history?start_at=2018-01-01&end_at=2018-09-0";
formattedDate:string;

  constructor(private httpClient:HttpClient,
    private dateFormat:DatePipe) { }

  public getLatestrates():Observable<any>{
    return this.httpClient.get<any>(this.latestRates);
  }

  //Get historical rates for any day since 1999
  public getHistoricalRates(date:string):Observable<any>{
    this.formattedDate = this.dateFormat.transform(date,"yyyy-MM-dd");
    var url = this.ratesForAnyDay + this.formattedDate;
    return  this.httpClient.get<any>(url);
  }

  //Get historical rates for a time period
  public getHistoricalRatesForYear(startDate:string,endDate:string){

  }

}
