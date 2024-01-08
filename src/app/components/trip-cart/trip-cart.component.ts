import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Trip } from '../../models/trip.model';
import { CommonModule } from '@angular/common';
import { CurrencyPipe } from '../../pipes/currency.pipe';
import { ReservationsService } from '../../services/reservations.service';
import { Reservation } from '../../models/reservation.model';
import { CurrencyService } from '../../services/currency.service';
import { OnsiteReservationsService } from '../../services/onsite-reservations.service';
import { OnsiteReservaionComponent } from '../onsite-reservaion/onsite-reservaion.component';

@Component({
  selector: 'app-trip-cart',
  standalone: true,
  templateUrl: './trip-cart.component.html',
  styleUrl: './trip-cart.component.css',
  imports: [CommonModule, CurrencyPipe, OnsiteReservaionComponent],
})
export class TripCartComponent implements OnInit {
  tripsInCart: Trip[] = [];
  selectedTrips: Trip[] = [];
  onsiteReservations: string[] = [];
  currency = 'USD';

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

  isTripSelected = (trip: Trip): boolean => {
    return this.selectedTrips.some((selected) => trip.id === selected.id);
  };

  tripReservations = (tripId: string): number => {
    return this.reservationsService.getTripReservationsCount(tripId);
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
      const reservation: Reservation = {
        userId: 'none',
        tripId: trip.id,
        count: trip.reservedSpots,
      };
      this.reservationsService.addReservation(reservation);
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

  constructor(
    private cartService: CartService,
    private reservationsService: ReservationsService,
    private currencyService: CurrencyService
  ) {}

  ngOnInit() {
    this.cartService.cart$.subscribe((trips) => {
      this.tripsInCart = trips;
    });
    this.selectedTrips = this.selectedTrips.concat(this.tripsInCart);
    this.currencyService.currency$.subscribe((currency) => {
      this.currency = currency;
    });
  }
}
