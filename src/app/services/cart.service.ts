import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, switchMap } from 'rxjs';
import { TripsService } from './trips.service';
import { Trip } from '../models/trip.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartSubject = new BehaviorSubject<any[]>([]);
  cart$ = this.cartSubject.asObservable();

  constructor(private tripsService: TripsService) {
    this.tripsService.trips$.subscribe((trips) => {
      const tripsWithReservations = this.filterTripsWithReservations(trips);
      this.cartSubject.next(tripsWithReservations);
    });
  }

  private filterTripsWithReservations(trips: any[]): any[] {
    const tripsWithReservations = trips.filter(
      (trip) => trip.reservedSpots > 0
    );
    return tripsWithReservations;
  }

  addReservation = (trip: Trip): void => {
    this.tripsService.addReservation(trip);
  };

  removeReservation = (trip: Trip, count?: number): void => {
    this.tripsService.removeReservation(trip, count);
  };
}
