import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Reservation } from '../models/reservation.model';
import { TripsService } from './trips.service';

@Injectable({
  providedIn: 'root',
})
export class OnsiteReservationsService {
  private onsiteReservationsSubject = new BehaviorSubject<string[]>([]);
  onsiteReservations$ = this.onsiteReservationsSubject.asObservable();
  onsiteReservationsValue$: Observable<number>;

  getTripReservationsCount = (tripId: string): number => {
    return this.onsiteReservationsSubject.value.filter((id) => id === tripId)
      .length;
  };

  addReservation = (tripId: string): void => {
    const currentOnSiteReservations = this.onsiteReservationsSubject.value;
    this.onsiteReservationsSubject.next([...currentOnSiteReservations, tripId]);
  };

  removeReservation = (tripId: string, count: number = 1): void => {
    while (count--) {
      const currentOnSiteReservations = this.onsiteReservationsSubject.value;
      const indexToRemove = currentOnSiteReservations.indexOf(tripId);

      if (indexToRemove != -1) {
        currentOnSiteReservations.splice(indexToRemove, 1);
        this.onsiteReservationsSubject.next(currentOnSiteReservations);
      }
    }
  };

  constructor(private tripsService: TripsService) {
    this.onsiteReservationsValue$ = combineLatest([
      this.tripsService.trips$,
      this.onsiteReservations$,
    ]).pipe(
      map(([trips, onsiteReservations]) => {
        return trips
          .filter((trip) => onsiteReservations.includes(trip.id))
          .reduce(
            (result, trip) =>
              result +
              trip.price *
                onsiteReservations.filter(
                  (reservation) => reservation === trip.id
                ).length,
            0
          );
      })
    );
  }
}
