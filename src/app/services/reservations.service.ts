import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IReservation, Reservation } from '../models/reservation.model';

@Injectable({
  providedIn: 'root',
})
export class ReservationsService {
  private reservationsSubject = new BehaviorSubject<Reservation[]>([]);
  reservations$ = this.reservationsSubject.asObservable();

  constructor(private store: AngularFirestore) {
    this.store
      .collection<IReservation>('reservations')
      .valueChanges()
      .subscribe((reservations) => {
        this.reservationsSubject.next(
          reservations.map((reservation) => new Reservation(reservation))
        );
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

  addReservation(reservation: IReservation): Promise<void> {
    const userTripsCollection =
      this.store.collection<IReservation>('reservations');
    const documentId = `${reservation.userId}_${reservation.tripId}_${reservation.purchaseDate}`;
    return userTripsCollection
      .doc(documentId)
      .set({
        ...reservation,
        purchaseDate: reservation.purchaseDate.toString(),
      });
  }

  getUserReservations(userId: string): Observable<IReservation[]> {
    const userTripsCollection = this.store.collection<IReservation>(
      'reservations',
      (ref) => ref.where('userId', '==', userId)
    );
    return userTripsCollection.valueChanges();
  }
}
