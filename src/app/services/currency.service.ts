import { Injectable } from '@angular/core';
import { CurrencyPipe } from '../pipes/currency.pipe';
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Reservation } from '../models/reservation.model';

const DEFAULT_CURRENCY = 'USD';

export const CURRENCIES = {
  USD: 1.0,
  PLN: 3.9,
  EUR: 0.9,
} as const;

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  private currencySubject = new BehaviorSubject<string>(DEFAULT_CURRENCY);
  currency$ = this.currencySubject.asObservable();

  changeCurrency = (curency: string) => {
    this.currencySubject.next(curency);
  };
}
