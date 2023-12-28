import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Trip } from '../interfaces/trip';
import _trips from '../../assets/trips.json';

@Component({
  selector: 'app-trips',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trips.component.html',
  styleUrl: './trips.component.css',
})
export class TripsComponent {
  trips: Trip[];
  maxPrice: number;
  minPrice: number;

  parseTrips = (data: any[]): Trip[] => {
    return data.map((trip) => ({
      ...trip,
      startDate: new Date(trip.startDate),
      endDate: new Date(trip.endDate),
      price: Number(trip.price),
      maxSpots: Number(trip.maxSpots),
      takenSpots: Number(trip.takenSpots),
    }));
  };

  addReservation = (index: number): void => {
    this.trips[index].takenSpots++;
  };

  removeReservation = (index: number): void => {
    this.trips[index].takenSpots--;
  };

  constructor() {
    this.trips = this.parseTrips(_trips);
    this.maxPrice = this.trips.reduce(
      (max, current) => (current.price > max.price ? current : max),
      this.trips[0]
    ).price;
    this.minPrice = this.trips.reduce(
      (min, current) => (current.price > min.price ? min : current),
      this.trips[0]
    ).price;
  }
}
