import { Routes } from '@angular/router';
import { TripsComponent } from './components/trips/trips.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { TripFormComponent } from './components/trip-form/trip-form.component';
import { TripCartComponent } from './components/trip-cart/trip-cart.component';
import { TripDetailComponent } from './components/trip-detail/trip-detail.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LogoutComponent } from './components/logout/logout.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'trip', component: TripsComponent },
  { path: 'cart', component: TripCartComponent },
  { path: 'trip/add', component: TripFormComponent, canActivate: [authGuard] },
  { path: 'trip/:id', component: TripDetailComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'logout', component: LogoutComponent, canActivate: [authGuard] },
];
