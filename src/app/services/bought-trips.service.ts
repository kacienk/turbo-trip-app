import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Reservation } from '../models/reservation.model';
import { ReservationsService } from './reservations.service';
import { TripsService } from './trips.service';
import { UserService } from './user.service';
import { Trip } from '../models/trip.model';
import { User } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class BoughtTripsService {
  boughtTrips$!: Observable<Trip[]>;
  userReservations$!: Observable<Reservation[]>;

  constructor(
    private reservationsService: ReservationsService,
    private tripsService: TripsService,
    private userService: UserService
  ) {
    this.userReservations$ = combineLatest([
      this.reservationsService.reservations$,
      this.userService.user$,
    ]).pipe(
      map(([reservations, user]) => {
        return this.getUserReservations(reservations, user);
      })
    );
    this.boughtTrips$ = combineLatest([
      this.tripsService.trips$,
      this.userReservations$,
    ]).pipe(
      map(([trips, reservations]) => {
        return this.getUserBoughtTrips(trips, reservations);
      })
    );
  }

  getUserReservations(reservations: Reservation[], user: User): Reservation[] {
    if (!user || !user.email) return [];

    return reservations.filter(
      (reservation) => reservation.userId === user.email
    );
  }

  getUserBoughtTrips(trips: Trip[], reservations: Reservation[]): Trip[] {
    return trips.filter((trip) =>
      reservations.some((reservation) => trip.id === reservation.tripId)
    );
  }
}
