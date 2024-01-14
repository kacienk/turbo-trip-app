import { Component } from '@angular/core';
import { ITrip, Trip } from '../../models/trip.model';
import { ActivatedRoute, Router } from '@angular/router';
import { TripsService } from '../../services/trips.service';
import { CURRENCIES, CurrencyService } from '../../services/currency.service';
import { CommonModule, DatePipe } from '@angular/common';
import { GoBackComponent } from '../go-back/go-back.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-update-trip-form',
  standalone: true,
  imports: [CommonModule, GoBackComponent, ReactiveFormsModule],
  providers: [DatePipe],
  templateUrl: './update-trip-form.component.html',
  styleUrl: './update-trip-form.component.css',
})
export class UpdateTripFormComponent {
  tripForm: FormGroup;
  trip: Trip | null | undefined;
  tripId: string = '';
  currency = 'USD';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private tripService: TripsService,
    private currencyService: CurrencyService,
    private router: Router,
    private datePipe: DatePipe
  ) {
    this.tripForm = this.formBuilder.group({
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

  updateTrip() {
    if (this.tripForm.valid) {
      const tripData: ITrip = {
        ...this.tripForm.value,
        id: this.tripId,
      } as ITrip;
      tripData.price /= CURRENCIES[this.currency as keyof typeof CURRENCIES];
      console.log(tripData);
      this.tripService.updateTrip(tripData);
      this.tripForm.reset();

      this.router.navigate(['/trip', this.tripId]);
    }
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const tripId = params.get('id');
      this.tripId = tripId ? tripId : 'null id/contact administratos';
      if (!tripId) {
        this.trip = undefined;
        return;
      }
      this.tripService.getTripById(tripId).subscribe((trip) => {
        this.trip = trip ? new Trip(trip) : null;
        if (this.trip) {
          this.tripForm.patchValue({
            name: this.trip.name,
            destinationCountry: this.trip.destinationCountry,
            startDate: this.datePipe.transform(
              this.trip.startDate,
              'yyyy-MM-dd'
            ),
            endDate: this.datePipe.transform(this.trip.endDate, 'yyyy-MM-dd'),
            price: this.trip.price,
            maxSpots: this.trip.maxSpots,
            description: this.trip.description,
            imageRef: this.trip.imageRef,
          });
        }
      });
      this.currencyService.currency$.subscribe((currency) => {
        this.currency = currency;
      });
    });
  }
}
