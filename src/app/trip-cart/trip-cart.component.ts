import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Currency, Trip } from '../models/trip.model';
import { CommonModule } from '@angular/common';
import { CurrencyPipe } from '../trips/currency.pipe';

@Component({
  selector: 'app-trip-cart',
  standalone: true,
  templateUrl: './trip-cart.component.html',
  styleUrl: './trip-cart.component.css',
  imports: [CommonModule, CurrencyPipe],
})
export class TripCartComponent {
  tripsInCart: Trip[] = [];
  selectedTrips: Trip[] = [];

  addReservation = (trip: Trip): void => {
    this.cartService.addReservation(trip);
  };

  removeReservation = (trip: Trip): void => {
    if (trip.reservedSpots <= 1 && this.selectedTrips.includes(trip)) {
      const indexToRemove = this.selectedTrips.indexOf(trip);
      this.selectedTrips.splice(indexToRemove, 1);
    }

    this.cartService.removeReservation(trip);
  };

  changeCurrency = (trip: Trip, currency: string): void => {
    trip.currency = currency as Currency;
  };

  isTripSelected = (trip: Trip): boolean => {
    return this.selectedTrips.some((selected) => trip.name === selected.name);
  };

  tripSelectionChange = (trip: Trip): void => {
    if (!this.selectedTrips.includes(trip)) {
      this.selectedTrips.push(trip);
    } else {
      const indexToRemove = this.selectedTrips.indexOf(trip);
      this.selectedTrips.splice(indexToRemove, 1);
    }
  };

  buy = (): void => {
    this.selectedTrips.forEach((trip) => {
      trip.takenSpots += trip.reservedSpots;
      this.cartService.removeReservation(trip, trip.reservedSpots);
    });
    this.selectedTrips = [];
  };

  selectedTripsValue = (): number => {
    return this.selectedTrips.reduce(
      (result, trip) => result + trip.price * trip.reservedSpots,
      0
    );
  };

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.cart$.subscribe((trips) => {
      this.tripsInCart = trips;
    });
    this.selectedTrips = this.selectedTrips.concat(this.tripsInCart);
  }
}
