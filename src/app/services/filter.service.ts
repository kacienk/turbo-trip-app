import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';
import { Trip } from '../models/trip.model';
import { TripService } from './trips.service';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private filterSubject = new BehaviorSubject<any>({});
  filters$ = this.filterSubject.asObservable();
  filteredTrips$!: Observable<Trip[]>;

  constructor(private tripService: TripService) {
    this.filteredTrips$ = combineLatest([
      this.tripService.trips$,
      this.filters$,
    ]).pipe(
      map(([trips, filters]) => {
        return this.filterTrips(trips, filters);
      })
    );
  }

  private filterTrips(trips: Trip[], filters: any): Trip[] {
    let filteredTrips = [...trips];
    console.log(filteredTrips);
    if (filters.location) {
      filteredTrips = filteredTrips.filter((trip) =>
        trip.destinationCountry
          .toLowerCase()
          .includes(filters.location.toLowerCase())
      );
    }

    if (filters.priceMin !== undefined) {
      filteredTrips = filteredTrips.filter(
        (trip) => trip.price >= filters.priceMin
      );
    }

    if (filters.priceMax !== undefined) {
      filteredTrips = filteredTrips.filter(
        (trip) => trip.price <= filters.priceMax
      );
    }

    if (filters.startDateMin) {
      filteredTrips = filteredTrips.filter(
        (trip) => new Date(trip.startDate) >= new Date(filters.startDateMin)
      );
    }

    if (filters.startDateMax) {
      filteredTrips = filteredTrips.filter(
        (trip) => new Date(trip.startDate) <= new Date(filters.startDateMax)
      );
    }

    if (filters.rating !== undefined) {
      filteredTrips = filteredTrips.filter(
        (trip) => trip.rating === filters.rating
      );
    }

    console.log(filteredTrips);
    return filteredTrips;
  }

  setFilters(filters: any) {
    this.filterSubject.next(filters);
  }

  clearFilters() {
    this.filterSubject.next({});
  }
}
