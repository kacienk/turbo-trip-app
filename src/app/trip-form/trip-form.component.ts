import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Currency, ITrip, Trip } from '../models/trip.model';
import { TripService } from '../services/trips.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trip-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './trip-form.component.html',
  styleUrl: './trip-form.component.css',
})
export class TripFormComponent {
  tripForm: FormGroup;
  currencies = Object.values(Currency); // Extracting enum values for select options

  constructor(
    private formBuilder: FormBuilder,
    private tripService: TripService
  ) {
    this.tripForm = this.formBuilder.group({
      name: ['', Validators.required],
      destinationCountry: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      maxSpots: ['', [Validators.required, Validators.min(1)]],
      takenSpots: ['', Validators.min(0)],
      description: ['', Validators.required],
      imageRef: ['', Validators.required],
    });
  }

  addTrip() {
    if (this.tripForm.valid) {
      const tripData: ITrip = this.tripForm.value as ITrip;
      const newTrip: Trip = new Trip(tripData);
      console.log(newTrip);
      this.tripService.addTrip(newTrip);
      console.log('Added new trip:', newTrip);
      this.tripForm.reset();
    }
  }
}
