import { Component, OnInit } from '@angular/core';
import {ExchangeRateService} from '../Service/exchange-rate.service';
import {Observable,Subscriber} from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
ratesList:any;
  constructor(private exchangeRate:ExchangeRateService) {}

  ngOnInit(){
this.exchangeRate.getLatestrates().subscribe(list => {
  debugger;
this.ratesList = list;
});
  }

}
