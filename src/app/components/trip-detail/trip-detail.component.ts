import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TripsService } from '../../services/trips.service';
import { Trip } from '../../models/trip.model';
import { CommonModule, DatePipe } from '@angular/common';
import { ReservationsService } from '../../services/reservations.service';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { CurrencyPipe } from '../../pipes/currency.pipe';
import { CurrencyService } from '../../services/currency.service';

@Component({
  selector: 'app-trip-detail',
  standalone: true,
  imports: [CommonModule, NgbRatingModule, CurrencyPipe, DatePipe],
  templateUrl: './trip-detail.component.html',
  styleUrl: './trip-detail.component.css',
})
export class TripDetailComponent implements OnInit {
  trip: Trip | undefined;
  currency = 'USD';

  addReservation = (): void => {
    if (this.trip) this.tripService.addReservation(this.trip);
  };

  removeReservation = (): void => {
    if (this.trip) this.tripService.removeReservation(this.trip);
  };

  deleteTrip = (): void => {
    if (this.trip) this.tripService.deleteTrip(this.trip.id);
  };

  tripReservations = (): number => {
    return this.trip
      ? this.reservationsService.getTripReservationsCount(this.trip.id)
      : 0;
  };

  constructor(
    private route: ActivatedRoute,
    private tripService: TripsService,
    private reservationsService: ReservationsService,
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
