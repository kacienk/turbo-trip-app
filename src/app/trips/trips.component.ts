import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Trip, Currency } from '../interfaces/trip';
import _trips from '../../assets/trips.json';
import { CurrencyPipe } from './currency.pipe';

@Component({
  selector: 'app-trips',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
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
      currency: Currency.USD,
    }));
  };

  addReservation = (index: number): void => {
    this.trips[index].takenSpots++;
  };

  removeReservation = (index: number): void => {
    this.trips[index].takenSpots--;
  };

  changeCurrency = (index: number, currency: string): void => {
    this.trips[index].currency = currency as Currency
  }

  currentlyReserved = (): number => {
    return this.trips.reduce((sum, current) => sum + current.takenSpots, 0)
  }

  removeTrip = (index: number): void => {
    this.trips.splice(index, 1)
  }

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
