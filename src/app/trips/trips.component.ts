import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Trip, Currency } from '../models/trip.model';
import { CurrencyPipe } from './currency.pipe';
import { TripService } from '../services/trips.service';
import { TripFormComponent } from '../trip-form/trip-form.component';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { TripListComponent } from '../trip-list/trip-list.component';

@Component({
  selector: 'app-trips',
  standalone: true,
  imports: [
    CommonModule,
    CurrencyPipe,
    TripFormComponent,
    NgbRatingModule,
    TripListComponent,
  ],
  templateUrl: './trips.component.html',
  styleUrl: './trips.component.css',
})
export class TripsComponent implements OnInit {
  trips: Trip[] = [];

  constructor(private tripService: TripService) {}

  currentlyReserved = (): number => {
    return this.trips.reduce((sum, current) => sum + current.takenSpots, 0);
  };

  ngOnInit() {
    this.tripService.trips$.subscribe((trips) => {
      this.trips = trips;
    });
  }
}
