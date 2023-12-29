import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Trip } from '../models/trip.model';
import _trips from '../../assets/trips.json';

@Injectable({
  providedIn: 'root',
})
export class TripsService {
  private tripsSubject = new BehaviorSubject<Trip[]>([]);
  trips$ = this.tripsSubject.asObservable();

  constructor() {
    this.tripsSubject.next(_trips.map((trip) => new Trip(trip)));
  }

  addTrip = (trip: Trip): void => {
    const currentTrips = this.tripsSubject.value;
    this.tripsSubject.next([...currentTrips, trip]);
  };

  removeTrip = (index: number): void => {
    const currentTrips = this.tripsSubject.value;
    currentTrips.splice(index, 1);
    this.tripsSubject.next(currentTrips);
  };

  addReservation = (trip: Trip): void => {
    const updatedTrips = this.tripsSubject.value.map((_trip) => {
      if (trip === _trip) {
        _trip.reservedSpots++;
      }
      return _trip;
    });

    this.tripsSubject.next(updatedTrips);
  };

  removeReservation = (trip: Trip, count?: number): void => {
    const updatedTrips = this.tripsSubject.value.map((_trip) => {
      if (trip === _trip) {
        if (count === undefined) _trip.reservedSpots--;
        else _trip.reservedSpots -= count;
      }
      return _trip;
    });

    this.tripsSubject.next(updatedTrips);
  };
}
