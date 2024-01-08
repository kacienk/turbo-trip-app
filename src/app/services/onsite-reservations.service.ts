import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Reservation } from '../models/reservation.model';

@Injectable({
  providedIn: 'root',
})
export class OnsiteReservationsService {
  private onsiteReservationsSubject = new BehaviorSubject<string[]>([]);
  onsiteReservations$ = this.onsiteReservationsSubject.asObservable();

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
    const indexToRemove = currentOnSiteReservations.indexOf(tripId);

    if (indexToRemove != -1) {
      currentOnSiteReservations.splice(indexToRemove, 1);
      this.onsiteReservationsSubject.next(currentOnSiteReservations);
    }
  };
}
