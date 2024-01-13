import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TripsService } from '../../services/trips.service';
import { Trip } from '../../models/trip.model';
import { CommonModule, DatePipe } from '@angular/common';
import { ReservationsService } from '../../services/reservations.service';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { CurrencyPipe } from '../../pipes/currency.pipe';
import { CurrencyService } from '../../services/currency.service';
import { OnsiteReservationComponent } from '../onsite-reservation/onsite-reservation.component';
import { TripRateComponent } from '../trip-rate/trip-rate.component';

@Component({
  selector: 'app-trip-detail',
  standalone: true,
  imports: [
    CommonModule,
    CurrencyPipe,
    DatePipe,
    OnsiteReservationComponent,
    TripRateComponent,
  ],
  templateUrl: './trip-detail.component.html',
  styleUrl: './trip-detail.component.css',
})
export class TripDetailComponent implements OnInit {
  trip: Trip | undefined;
  currency = 'USD';

  deleteTrip = (): void => {
    if (this.trip) this.tripService.deleteTrip(this.trip.id);
  };

  constructor(
    private route: ActivatedRoute,
    private tripService: TripsService,
    private currencyService: CurrencyService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const tripId = params.get('id');
      if (!tripId) {
        this.trip = undefined;
        return;
      }
      this.tripService.getTripById(tripId).subscribe((trip) => {
        this.trip = trip ? new Trip(trip) : undefined;
      });
      this.currencyService.currency$.subscribe((currency) => {
        this.currency = currency;
      });
    });
  }
}
