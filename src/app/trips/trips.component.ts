import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Trip, Currency } from '../models/trip.model';
import { CurrencyPipe } from './currency.pipe';
import { TripService } from './trips.service';
import { TripFormComponent } from '../trip-form/trip-form.component';

@Component({
  selector: 'app-trips',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, TripFormComponent],
  templateUrl: './trips.component.html',
  styleUrl: './trips.component.css',
})
export class TripsComponent implements OnInit{
  trips: Trip[] = [];

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
    this.tripService.removeTrip(index)
  }

  maxPrice = (): number => {
    const maxPrice = this.trips.reduce(
      (max, current) => (current.price > max.price ? current : max),
      this.trips[0]
    ).price;
    
    return maxPrice;
  }

  minPrice = (): number => {
    const minPrice = this.trips.reduce(
      (min, current) => (current.price > min.price ? min : current),
      this.trips[0]
    ).price;
    
    return minPrice;
  }

  constructor(private tripService: TripService) { }

  ngOnInit() {
    this.tripService.trips$.subscribe((trips) => {
      this.trips = trips;
    });
  }

}
