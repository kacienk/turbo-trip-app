import { Routes } from '@angular/router';
import { TripsComponent } from './trips/trips.component';
import { HomePageComponent } from './home-page/home-page.component';
import { TripFormComponent } from './trip-form/trip-form.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'trips', component: TripsComponent },
  { path: 'cart', component: HomePageComponent },
  { path: 'add-trip', component: TripFormComponent },
];
