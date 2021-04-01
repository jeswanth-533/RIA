export interface ExchangeRateItem {
    base: string;
    date: string;
    rates: ExchangeRates;
  }

  export interface ExchangeRates{
    [property: string]: number;
  }

  export interface calculatedExchangeRates{
      currencyCode:string,
      exchangeValue:number,
      receivingAmount:number,
      reverseRate:number
  }