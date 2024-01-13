import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Reservation } from '../models/reservation.model';
import { TripsService } from './trips.service';
import { ITrip } from '../models/trip.model';
import { Rating as Rate } from '../models/rate.model';

@Injectable({
  providedIn: 'root',
})
export class RatesService {
  constructor(private store: AngularFirestore) {}

  getUserRate(userEmail: string, tripId: string): Observable<Rate | undefined> {
    const userRating = this.store
      .collection<ITrip>('trips')
      .doc(tripId)
      .collection<Rate>('rates')
      .doc(userEmail);

    return userRating.valueChanges();
  }

  setUserRate(
    userEmail: string,
    tripId: string,
    rating: number
  ): Promise<void> {
    const userRating = this.store
      .collection<ITrip>('trips')
      .doc(tripId)
      .collection<Rate>('rates')
      .doc(userEmail);

    return userRating.set({ userId: userEmail, rate: rating });
  }

  getTripRates(tripId: string): Observable<Rate[]> {
    const ratings = this.store
      .collection<ITrip>('trips')
      .doc(tripId)
      .collection<Rate>('rates');

    return ratings.valueChanges();
  }
}
