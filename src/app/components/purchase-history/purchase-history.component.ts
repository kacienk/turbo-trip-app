import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BoughtTripsService } from '../../services/bought-trips.service';
import { Trip } from '../../models/trip.model';
import { Router } from '@angular/router';
import { Reservation } from '../../models/reservation.model';
import { HistoryFilterComponent } from '../history-filter/history-filter.component';
import {
  HistoryFilter,
  HistoryFilterService,
} from '../../services/history-filter.service';

@Component({
  selector: 'app-purchase-history',
  standalone: true,
  imports: [CommonModule, DatePipe, HistoryFilterComponent],
  templateUrl: './purchase-history.component.html',
  styleUrl: './purchase-history.component.css',
})
export class PurchaseHistoryComponent implements OnInit {
  trips: Trip[] = [];
  userReservations: Reservation[] = [];
  historyFilters: HistoryFilter = { past: true, active: true, future: true };

  constructor(
    private boughtTripsService: BoughtTripsService,
    private historyFilterService: HistoryFilterService,
    private router: Router
  ) {}

  viewDetails(tripId?: string): void {
    this.router.navigate(['/trip', tripId]);
  }

  getTripById(tripId: string): Trip | undefined {
    return this.trips.find((trip) => trip.id === tripId);
  }

  getFilteredReservations(): Reservation[] {
    const nowDate = new Date();
    const pastReservations = this.historyFilters.past
      ? this.userReservations.filter((reservation) => {
          const trip = this.getTripById(reservation.tripId);
          console.log(`${trip!.id} ${trip!.endDate < nowDate}`);
          return trip ? trip.endDate < nowDate : true;
        })
      : [];
    const activeReservations = this.historyFilters.active
      ? this.userReservations.filter((reservation) => {
          const trip = this.getTripById(reservation.tripId);
          return trip
            ? trip.startDate >= nowDate && trip.endDate <= nowDate
            : true;
        })
      : [];
    const futureReservations = this.historyFilters.future
      ? this.userReservations.filter((reservation) => {
          const trip = this.getTripById(reservation.tripId);
          return trip ? trip.startDate > nowDate : true;
        })
      : [];

    console.debug(futureReservations);
    console.debug(activeReservations);
    console.debug(pastReservations);
    return [...futureReservations, ...activeReservations, ...pastReservations];
  }

  ngOnInit(): void {
    this.boughtTripsService.boughtTrips$.subscribe((trips) => {
      this.trips = trips;
    });
    this.boughtTripsService.userReservations$.subscribe((reservations) => {
      this.userReservations = reservations;
    });
    this.historyFilterService.filters$.subscribe((filters) => {
      this.historyFilters = filters;
    });
  }
}
