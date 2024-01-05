import { Routes } from '@angular/router';
import { TripsComponent } from './components/trips/trips.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { TripFormComponent } from './components/trip-form/trip-form.component';
import { TripCartComponent } from './components/trip-cart/trip-cart.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'trips', component: TripsComponent },
  { path: 'cart', component: TripCartComponent },
  { path: 'add-trip', component: TripFormComponent },
];
