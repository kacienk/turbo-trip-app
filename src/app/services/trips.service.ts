import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Trip } from '../models/trip.model';
import _trips from '../../assets/trips.json';

@Injectable({
  providedIn: 'root',
})
export class TripService {
  private tripsSubject = new BehaviorSubject<Trip[]>([]);
  trips$ = this.tripsSubject.asObservable();

  constructor() {
    this.tripsSubject.next(_trips.map((trip) => new Trip(trip)));
  }

  addTrip(trip: Trip) {
    const currentTrips = this.tripsSubject.value;
    this.tripsSubject.next([...currentTrips, trip]);
  }

  removeTrip(index: number) {
    const currentTrips = this.tripsSubject.value;
    currentTrips.splice(index, 1);
    this.tripsSubject.next(currentTrips);
  }
}
