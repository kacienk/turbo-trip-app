import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Trip } from '../../models/trip.model';
import { CurrencyPipe } from '../../pipes/currency.pipe';
import { TripsService } from '../../services/trips.service';
import { TripFormComponent } from '../trip-form/trip-form.component';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { TripListComponent } from '../trip-list/trip-list.component';
import { TripFilterComponent } from '../trip-filter/trip-filter.component';

@Component({
  selector: 'app-trips',
  standalone: true,
  templateUrl: './trips.component.html',
  styleUrl: './trips.component.css',
  imports: [
    CommonModule,
    CurrencyPipe,
    TripFormComponent,
    NgbRatingModule,
    TripListComponent,
    TripFilterComponent,
  ],
})
export class TripsComponent implements OnInit {
  trips: Trip[] = [];

  constructor(private tripService: TripsService) {}

  ngOnInit() {
    this.tripService.trips$.subscribe((trips) => {
      this.trips = trips;
    });
  }
}
