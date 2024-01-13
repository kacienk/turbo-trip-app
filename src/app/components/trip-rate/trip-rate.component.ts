import { Component, Input, OnInit } from '@angular/core';
import { RatesService } from '../../services/rates.service';
import { Rating } from '../../models/rate.model';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../services/user.service';
import { User } from '@angular/fire/auth';
import { min } from 'rxjs';

@Component({
  selector: 'app-trip-rate',
  standalone: true,
  imports: [NgbRatingModule],
  templateUrl: './trip-rate.component.html',
  styleUrl: './trip-rate.component.css',
})
export class TripRateComponent implements OnInit {
  tripRates: Rating[] = [];
  userRate: Rating | undefined;
  user: User | null = null;
  @Input() tripId: string = '';

  constructor(
    private ratesService: RatesService,
    private userService: UserService
  ) {}

  getUserRate(): number {
    return this.userRate ? this.userRate.rate : 0;
  }

  onRatingChange(newRating: number): void {
    this.ratesService.setUserRate(this.user?.email!, this.tripId, newRating);
  }

  getAverageRate(): number {
    return (
      this.tripRates.reduce((result, rate) => {
        return result + rate.rate;
      }, 0) / (this.tripRates.length ? this.tripRates.length : 1)
    );
  }

  ngOnInit(): void {
    this.ratesService.getTripRates(this.tripId).subscribe((ratings) => {
      this.tripRates = ratings;
    });
    this.userService.user$.subscribe((user) => {
      this.user = user;
      this.ratesService
        .getUserRate(this.user?.email!, this.tripId)
        .subscribe((rate) => {
          this.userRate = rate;
        });
    });
  }
}
