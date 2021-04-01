import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ExchangeRateService} from './Service/exchange-rate.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {from} from 'rxjs';
import {DatePipe} from '@angular/common';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  exports:[HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },ExchangeRateService,HttpClient,DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
