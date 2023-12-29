import { Component, OnInit } from '@angular/core';
import { Currency, Trip } from '../models/trip.model';
import { FilterService } from '../services/filter.service';
import { CommonModule } from '@angular/common';
import { TripFormComponent } from '../trip-form/trip-form.component';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { TripsService } from '../services/trips.service';
import { CurrencyPipe } from '../trips/currency.pipe';
import { TripFilterComponent } from '../trip-filter/trip-filter.component';
import { Observable } from 'rxjs';

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
  filteredTrips$: Observable<Trip[]> = this.filterService.filteredTrips$;

  addReservation = (trip: Trip): void => {
    this.tripService.addReservation(trip);
  };

  removeReservation = (trip: Trip): void => {
    this.tripService.removeReservation(trip);
  };

  changeCurrency = (index: number, currency: string): void => {
    this.trips[index].currency = currency as Currency;
  };

  removeTrip = (index: number): void => {
    this.tripService.removeTrip(index);
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

  constructor(
    private filterService: FilterService,
    private tripService: TripsService
  ) {}

  ngOnInit() {
    this.tripService.trips$.subscribe((trips) => {
      this.trips = trips;
    });
  }
}
