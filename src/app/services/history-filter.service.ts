import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';
import { Trip } from '../models/trip.model';
import { TripsService } from './trips.service';
import { Reservation } from '../models/reservation.model';
import { ReservationsService } from './reservations.service';
import { UserService } from './user.service';
import { BoughtTripsService } from './bought-trips.service';

export type HistoryFilter = {
  past: boolean;
  active: boolean;
  future: boolean;
};

@Injectable({
  providedIn: 'root',
})
export class HistoryFilterService {
  private filterSubject = new BehaviorSubject<any>({});
  filters$ = this.filterSubject.asObservable();

  constructor() {
    const initialFilter: HistoryFilter = {
      past: true,
      active: true,
      future: true,
    };
    this.filterSubject.next(initialFilter);
  }

  setFilters(filters: HistoryFilter) {
    this.filterSubject.next(filters);
  }

  clearFilters() {
    this.filterSubject.next({
      past: true,
      active: true,
      future: true,
    });
  }
}
