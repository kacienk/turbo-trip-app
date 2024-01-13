import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Reservation } from '../models/reservation.model';

@Injectable({
  providedIn: 'root',
})
export class ReservationsService {
  private reservationsSubject = new BehaviorSubject<Reservation[]>([]);
  reservations$ = this.reservationsSubject.asObservable();

  constructor(private store: AngularFirestore) {
    this.store
      .collection<Reservation>('reservations')
      .valueChanges()
      .subscribe((reservations) => {
        this.reservationsSubject.next(reservations);
      });
  }

  getTripReservations = (tripId: string): Reservation[] => {
    return this.reservationsSubject
      .getValue()
      .filter((reservation) => reservation.tripId === tripId);
  };

  getTripReservationsCount = (tripId: string): number => {
    return this.getTripReservations(tripId).reduce(
      (result, reservation) => result + reservation.count,
      0
    );
  };

  addReservation(reservation: Reservation): Promise<void> {
    const userTripsCollection =
      this.store.collection<Reservation>('reservations');
    const documentId = `${reservation.userId}_${reservation.tripId}`;
    return userTripsCollection.doc(documentId).set(reservation);
  }

  getUserReservations(userId: string): Observable<Reservation[]> {
    const userTripsCollection = this.store.collection<Reservation>(
      'reservations',
      (ref) => ref.where('userId', '==', userId)
    );
    return userTripsCollection.valueChanges();
  }
}
