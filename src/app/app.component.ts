import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { ReservationSumComponent } from './components/reservation-sum/reservation-sum.component';
import { FirestoreModule, Firestore } from '@angular/fire/firestore';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { TripsService } from './services/trips.service';
import _trips from '../assets/trips.json';
import { ITrip } from './models/trip.model';
import { CurrencySelectorComponent } from './components/currency-selector/currency-selector.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NgbModule,
    RouterLink,
    RouterLinkActive,
    ReservationSumComponent,
    AngularFirestoreModule,
    CurrencySelectorComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'turbo-trip-app';
  isMenuCollapsed = true;

  populate = () => {
    _trips.forEach((trip: ITrip) => {
      this.tripsService.addTrip(trip);
    });
  };

  constructor(
    private modalService: NgbModal,
    private tripsService: TripsService
  ) {
    //this.populate();
  }

  public open(modal: any): void {
    this.modalService.open(modal);
  }
}
