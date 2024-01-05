import { Pipe, PipeTransform } from '@angular/core';
import { CURRENCIES } from '../services/currency.service';

@Pipe({ standalone: true, name: 'currencyPipe' })
export class CurrencyPipe implements PipeTransform {
  transform(price: number, currency: string): string {
    const convertedPrice =
      price * CURRENCIES[currency as keyof typeof CURRENCIES];
    switch (currency) {
      case 'USD':
        return '$' + convertedPrice.toFixed(2);
      case 'PLN':
        return convertedPrice.toFixed(2) + 'zł';
      case 'EUR':
        return convertedPrice.toFixed(2) + '€';
      default:
        return convertedPrice.toFixed(2);
    }
  }
}
