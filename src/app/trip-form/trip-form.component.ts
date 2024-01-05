import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Currency, ITrip, Trip } from '../models/trip.model';
import { TripsService } from '../services/trips.service';
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
    private tripService: TripsService
  ) {
    this.tripForm = this.formBuilder.group({
      id: ['', Validators.pattern('[a-z0-9-]*')],
      name: ['', Validators.required],
      destinationCountry: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      maxSpots: ['', [Validators.required, Validators.min(1)]],
      description: ['', Validators.required],
      imageRef: ['', Validators.required],
    });
  }

  addTrip() {
    if (this.tripForm.valid) {
      const regex = /[^a-z0-9-]/g;
      const tripData: ITrip = this.tripForm.value as ITrip;
      tripData.takenSpots = 0;
      if (!tripData.id) {
        tripData.id = tripData.name
          .replace(' ', '-')
          .toLowerCase()
          .replace(regex, '');
      }
      console.log(tripData);
      this.tripService.addTrip(tripData);
      console.log('Added new trip:', tripData);
      this.tripForm.reset();
    }
  }
}
