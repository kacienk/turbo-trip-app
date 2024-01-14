import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ITrip, Trip } from '../../models/trip.model';
import { TripsService } from '../../services/trips.service';
import { CommonModule } from '@angular/common';
import { CURRENCIES, CurrencyService } from '../../services/currency.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-trip-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-trip-form.component.html',
  styleUrl: './add-trip-form.component.css',
})
export class AddTripFormComponent implements OnInit {
  tripForm: FormGroup;
  currency = 'USD';

  constructor(
    private formBuilder: FormBuilder,
    private tripService: TripsService,
    private currencyService: CurrencyService,
    private router: Router
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
      tripData.price /= CURRENCIES[this.currency as keyof typeof CURRENCIES];

      if (!tripData.id) {
        tripData.id = tripData.name
          .replace(' ', '-')
          .toLowerCase()
          .replace(regex, '');
      }

      this.tripService.addTrip(tripData);
      this.tripForm.reset();

      this.router.navigate(['/trip']);
    }
  }

  ngOnInit(): void {
    this.currencyService.currency$.subscribe((currency) => {
      this.currency = currency;
    });
  }
}
