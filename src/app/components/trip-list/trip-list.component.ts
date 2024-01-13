import { Component, OnInit } from '@angular/core';
import { Trip } from '../../models/trip.model';
import { FilterService } from '../../services/filter.service';
import { CommonModule } from '@angular/common';
import { TripFormComponent } from '../trip-form/trip-form.component';
import {
  NgbPaginationModule,
  NgbRatingModule,
} from '@ng-bootstrap/ng-bootstrap';
import { TripsService } from '../../services/trips.service';
import { CurrencyPipe } from '../../pipes/currency.pipe';
import { TripFilterComponent } from '../trip-filter/trip-filter.component';
import { Observable } from 'rxjs';
import { ReservationsService } from '../../services/reservations.service';
import { CurrencyService } from '../../services/currency.service';
import { Router } from '@angular/router';
import { OnsiteReservationComponent } from '../onsite-reservation/onsite-reservation.component';

@Component({
  selector: 'app-trip-list',
  standalone: true,
  templateUrl: './trip-list.component.html',
  styleUrl: './trip-list.component.css',
  imports: [
    CommonModule,
    CurrencyPipe,
    TripFormComponent,
    NgbRatingModule,
    TripFilterComponent,
    OnsiteReservationComponent,
    NgbPaginationModule,
  ],
})
export class TripListComponent implements OnInit {
  trips: Trip[] = [];
  currency = 'USD';
  filteredTrips: Trip[] = [];
  pageSizes = [2, 5, 10];
  pageSize = 10;
  currentPage = 1;

  maxPrice = (): number => {
    const maxPrice = this.trips.reduce(
      (max, current) => (current.price > max.price ? current : max),
      this.trips[0]
    ).price;

    return maxPrice;
  };

  minPrice = (): number => {
    const minPrice = this.trips.reduce(
      (min, current) => (current.price > min.price ? min : current),
      this.trips[0]
    ).price;

    return minPrice;
  };

  viewDetails(tripId: string): void {
    this.router.navigate(['/trip', tripId]);
  }

  setPage(page: number) {
    this.currentPage = page;
  }

  getTotalPages(): number {
    return Math.ceil(this.filteredTrips.length / this.pageSize);
  }

  getCurrentPageItems(): Trip[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.filteredTrips.slice(startIndex, endIndex);
  }

  onChange = (event: any): void => {
    this.pageSize = parseInt(event.target.value, 10);
    console.log(this.pageSize);
  };

  constructor(
    private router: Router,
    private filterService: FilterService,
    private tripService: TripsService,
    private reservationsService: ReservationsService,
    private currencyService: CurrencyService
  ) {}

  ngOnInit() {
    this.tripService.trips$.subscribe((trips) => {
      this.trips = trips;
    });
    this.currencyService.currency$.subscribe((currency) => {
      this.currency = currency;
    });
    this.filterService.filteredTrips$.subscribe((filteredTrips) => {
      this.filteredTrips = filteredTrips;
    });
  }
}
