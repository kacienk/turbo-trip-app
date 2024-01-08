import { Routes } from '@angular/router';
import { TripsComponent } from './components/trips/trips.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { TripFormComponent } from './components/trip-form/trip-form.component';
import { TripCartComponent } from './components/trip-cart/trip-cart.component';
import { TripDetailComponent } from './components/trip-detail/trip-detail.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'trip', component: TripsComponent },
  { path: 'cart', component: TripCartComponent },
  { path: 'add-trip', component: TripFormComponent },
  { path: 'trip/:id', component: TripDetailComponent },
];
