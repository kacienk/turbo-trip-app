import { Component, OnInit } from '@angular/core';
import { TripService } from '../services/trips.service';
import { Trip } from '../models/trip.model';

@Component({
  selector: 'app-reservation-sum',
  standalone: true,
  imports: [],
  templateUrl: './reservation-sum.component.html',
  styleUrl: './reservation-sum.component.css',
})
export class ReservationSumComponent implements OnInit {
  trips: Trip[] = [];

  reservationSum = (): number => {
    return this.trips.reduce(
      (result, trip) => result + trip.price * trip.reservedSpots,
      0
    );
  };

  constructor(private tripService: TripService) {}

  ngOnInit() {
    this.tripService.trips$.subscribe((trips) => {
      this.trips = trips;
    });
  }
}
