import { Component, OnInit } from '@angular/core';
import { TripsService } from '../../services/trips.service';
import { Trip } from '../../models/trip.model';
import { CommonModule } from '@angular/common';
import { CurrencyService } from '../../services/currency.service';
import { CurrencyPipe } from '../../pipes/currency.pipe';
import { OnsiteReservationsService } from '../../services/onsite-reservations.service';
import { Observable, combineLatest, map } from 'rxjs';

@Component({
  selector: 'app-reservation-sum',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './reservation-sum.component.html',
  styleUrl: './reservation-sum.component.css',
})
export class ReservationSumComponent implements OnInit {
  reservationsCount: number = 0;
  reservationsValue: number = 0;
  currency = 'USD';

  constructor(
    private tripsService: TripsService,
    private currencyService: CurrencyService,
    private onsiteReservationsService: OnsiteReservationsService
  ) {}

  ngOnInit() {
    this.currencyService.currency$.subscribe((currency) => {
      this.currency = currency;
    });
    this.onsiteReservationsService.onsiteReservations$.subscribe(
      (onsiteReservations) => {
        this.reservationsCount = onsiteReservations.length;
      }
    );
    this.onsiteReservationsService.onsiteReservationsValue$.subscribe(
      (value) => {
        this.reservationsValue = value;
      }
    );
  }
}
