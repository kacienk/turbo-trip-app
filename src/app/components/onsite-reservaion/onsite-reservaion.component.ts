import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { OnsiteReservationsService } from '../../services/onsite-reservations.service';

@Component({
  selector: 'app-onsite-reservaion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './onsite-reservaion.component.html',
  styleUrl: './onsite-reservaion.component.css',
})
export class OnsiteReservaionComponent implements OnInit {
  onsiteReservations: string[] = [];
  @Input() tripId: string = '';
  @Input() takenSpots: number = 0;
  @Input() maxSpots: number = 0;

  getReservedSpotsCount = (): number => {
    return this.onsiteReservationService.getTripReservationsCount(this.tripId);
  };

  freeSpots = (): number => {
    return this.maxSpots - (this.takenSpots + this.getReservedSpotsCount());
  };

  addReservation = (): void => {
    this.onsiteReservationService.addReservation(this.tripId);
  };

  removeReservation = (): void => {
    this.onsiteReservationService.removeReservation(this.tripId);
  };

  constructor(private onsiteReservationService: OnsiteReservationsService) {}

  ngOnInit(): void {
    this.onsiteReservationService.onsiteReservations$.subscribe(
      (onsiteReservations) => {
        this.onsiteReservations = onsiteReservations;
      }
    );
  }
}
