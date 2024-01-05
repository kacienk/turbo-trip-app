import { Component, OnInit } from '@angular/core';
import { TripsService } from '../../services/trips.service';
import { Trip } from '../../models/trip.model';
import { CommonModule } from '@angular/common';
import { CurrencyService } from '../../services/currency.service';
import { CurrencyPipe } from '../../pipes/currency.pipe';

@Component({
  selector: 'app-reservation-sum',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './reservation-sum.component.html',
  styleUrl: './reservation-sum.component.css',
})
export class ReservationSumComponent implements OnInit {
  trips: Trip[] = [];
  currency = 'USD';

  reservationSum = (): number => {
    return this.trips.reduce(
      (result, trip) => result + trip.price * trip.reservedSpots,
      0
    );
  };

  currentlyReserved = (): number => {
    return this.trips.reduce((sum, current) => sum + current.reservedSpots, 0);
  };

  constructor(
    private tripService: TripsService,
    private currencyService: CurrencyService
  ) {}

  ngOnInit() {
    this.tripService.trips$.subscribe((trips) => {
      this.trips = trips;
    });
    this.currencyService.currency$.subscribe((currency) => {
      this.currency = currency;
    });
  }
}
