import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExchangeRateService {
latestRates:string = "https://api.exchangeratesapi.io/latest";
  constructor(private httpClient:HttpClient) { }

  public getLatestrates():Observable<any>{
    return this.httpClient.get<any>(this.latestRates);
  }

  public getQuoteByDifferentCurrency():Observable<any>{
    return 
  }
}
