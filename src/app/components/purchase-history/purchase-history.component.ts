import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BoughtTripsService } from '../../services/bought-trips.service';
import { Trip } from '../../models/trip.model';
import { Router } from '@angular/router';
import { Reservation } from '../../models/reservation.model';

@Component({
  selector: 'app-purchase-history',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './purchase-history.component.html',
  styleUrl: './purchase-history.component.css',
})
export class PurchaseHistoryComponent implements OnInit {
  trips: Trip[] = [];
  userReservations: Reservation[] = [];

  constructor(
    private boughtTripsService: BoughtTripsService,
    private router: Router
  ) {}

  viewDetails(tripId?: string): void {
    this.router.navigate(['/trip', tripId]);
  }

  getTripById(tripId: string): Trip | undefined {
    console.log(this.userReservations);
    return this.trips.find((trip) => trip.id === tripId);
  }

  ngOnInit(): void {
    this.boughtTripsService.boughtTrips$.subscribe((trips) => {
      this.trips = trips;
    });
    this.boughtTripsService.userReservations$.subscribe((reservations) => {
      this.userReservations = reservations;
    });
  }
}
