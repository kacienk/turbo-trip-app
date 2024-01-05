import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../../services/currency.service';
import { CommonModule } from '@angular/common';
import { CURRENCIES } from '../../services/currency.service';

@Component({
  selector: 'app-currency-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './currency-selector.component.html',
  styleUrl: './currency-selector.component.css',
})
export class CurrencySelectorComponent implements OnInit {
  currencies = Object.keys(CURRENCIES);
  currency = 'USD';

  constructor(private currencyService: CurrencyService) {}

  onChange = (event: any): void => {
    this.currencyService.changeCurrency(
      event.target.value as keyof typeof CURRENCIES
    );
  };

  ngOnInit() {
    this.currencyService.currency$.subscribe((currency) => {
      this.currency = currency;
    });
  }
}
