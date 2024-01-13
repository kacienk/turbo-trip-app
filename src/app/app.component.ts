import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReservationSumComponent } from './components/reservation-sum/reservation-sum.component';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { TripsService } from './services/trips.service';
import _trips from '../assets/trips.json';
import { ITrip } from './models/trip.model';
import { CurrencySelectorComponent } from './components/currency-selector/currency-selector.component';
import { Auth, User } from '@angular/fire/auth';
import { UserService } from './services/user.service';

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
export class AppComponent implements OnInit {
  title = 'turbo-trip-app';
  isMenuCollapsed = true;
  user: User | null = null;

  populate = () => {
    _trips.forEach((trip: ITrip) => {
      this.tripsService.addTrip(trip);
    });
  };

  constructor(
    private modalService: NgbModal,
    private tripsService: TripsService,
    private userService: UserService
  ) {
    //this.populate();
  }

  public open(modal: any): void {
    this.modalService.open(modal);
  }

  ngOnInit(): void {
    this.userService.user$.subscribe((user) => {
      this.user = user;
    });
  }
}
