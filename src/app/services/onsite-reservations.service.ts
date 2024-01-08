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

  removeReservation = (tripId: string): void => {
    const currentOnSiteReservations = this.onsiteReservationsSubject.value;
    console.debug(currentOnSiteReservations);
    const indexToRemove = currentOnSiteReservations.indexOf(tripId);
    console.debug(indexToRemove);

    if (indexToRemove != -1) {
      currentOnSiteReservations.splice(indexToRemove, 1);
      console.debug(currentOnSiteReservations);
      this.onsiteReservationsSubject.next(currentOnSiteReservations);
    }
  };

  constructor(private tripsService: TripsService) {
    this.onsiteReservationsValue$ = combineLatest([
      this.tripsService.trips$,
      this.onsiteReservations$,
    ]).pipe(
      map(([trips, onsiteReservations]) => {
        console.log(`aaaaa ${JSON.stringify(onsiteReservations)}`);
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
