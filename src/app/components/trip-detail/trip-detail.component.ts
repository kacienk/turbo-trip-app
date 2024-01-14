import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TripsService } from '../../services/trips.service';
import { Trip } from '../../models/trip.model';
import { CommonModule, DatePipe } from '@angular/common';
import { CurrencyPipe } from '../../pipes/currency.pipe';
import { CurrencyService } from '../../services/currency.service';
import { OnsiteReservationComponent } from '../onsite-reservation/onsite-reservation.component';
import { TripRateComponent } from '../trip-rate/trip-rate.component';
import { GoBackComponent } from '../go-back/go-back.component';

@Component({
  selector: 'app-trip-detail',
  standalone: true,
  imports: [
    CommonModule,
    CurrencyPipe,
    DatePipe,
    OnsiteReservationComponent,
    TripRateComponent,
    GoBackComponent,
  ],
  templateUrl: './trip-detail.component.html',
  styleUrl: './trip-detail.component.css',
})
export class TripDetailComponent implements OnInit {
  tripId: string = '';
  trip: Trip | undefined;
  currency = 'USD';

  deleteTrip = (): void => {
    if (this.trip) this.tripService.deleteTrip(this.trip.id);
  };

  updateTrip = (): void => {
    if (this.trip) this.router.navigate(['/trip', this.trip.id, 'update']);
  };

  constructor(
    private route: ActivatedRoute,
    private tripService: TripsService,
    private currencyService: CurrencyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const tripId = params.get('id');
      this.tripId = tripId ? tripId : 'null id/contact administratos';
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
