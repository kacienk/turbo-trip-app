import { Pipe, PipeTransform } from "@angular/core";
import { Currency } from "../interfaces/trip";

@Pipe({ standalone: true, name: 'currencyPipe' })
export class CurrencyPipe implements PipeTransform {
  transform(price: number, currency: string): string {
      if (!price)
        return "0";
      if (!currency || currency === Currency.USD)
        return price.toFixed(2);

      if (currency == Currency.PLN)
        return (price * 3.90).toFixed(2);

      return (price * 0.90).toFixed(2);
  }
}