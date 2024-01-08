import { Component, OnInit } from '@angular/core';
import { Trip } from '../../models/trip.model';
import { FilterService } from '../../services/filter.service';
import { CommonModule } from '@angular/common';
import { TripFormComponent } from '../trip-form/trip-form.component';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { TripsService } from '../../services/trips.service';
import { CurrencyPipe } from '../../pipes/currency.pipe';
import { TripFilterComponent } from '../trip-filter/trip-filter.component';
import { Observable } from 'rxjs';
import { ReservationsService } from '../../services/reservations.service';
import { CurrencyService } from '../../services/currency.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trip-list',
  standalone: true,
  templateUrl: './trip-list.component.html',
  styleUrl: './trip-list.component.css',
  imports: [
    CommonModule,
    CurrencyPipe,
    TripFormComponent,
    NgbRatingModule,
    TripFilterComponent,
  ],
})
export class TripListComponent implements OnInit {
  trips: Trip[] = [];
  currency = 'USD';
  filteredTrips$: Observable<Trip[]> = this.filterService.filteredTrips$;

  addReservation = (trip: Trip): void => {
    this.tripService.addReservation(trip);
  };

  removeReservation = (trip: Trip): void => {
    this.tripService.removeReservation(trip);
  };

  deleteTrip = (tripId: string): void => {
    this.tripService.deleteTrip(tripId);
  };

  maxPrice = (): number => {
    const maxPrice = this.trips.reduce(
      (max, current) => (current.price > max.price ? current : max),
      this.trips[0]
    ).price;

    return maxPrice;
  };

  minPrice = (): number => {
    const minPrice = this.trips.reduce(
      (min, current) => (current.price > min.price ? min : current),
      this.trips[0]
    ).price;

    return minPrice;
  };

  tripReservations = (tripId: string): number => {
    return this.reservationsService.getTripReservationsCount(tripId);
  };

  viewDetails(tripId: string): void {
    // Optional: Perform custom action when clicking on the image
    console.log(`Clicked on the image of trip with ID ${tripId}`);

    // Navigate to the detailed view
    this.router.navigate(['/trip', tripId]);
  }

  constructor(
    private router: Router,
    private filterService: FilterService,
    private tripService: TripsService,
    private reservationsService: ReservationsService,
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
