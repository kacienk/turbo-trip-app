export interface IReservation {
  userId: string;
  tripId: string;
  count: number;
  purchaseDate: Date | string;
}

export class Reservation implements IReservation {
  userId: string;
  tripId: string;
  count: number;
  purchaseDate: Date;

  constructor(reservation: IReservation) {
    this.userId = reservation.userId;
    this.tripId = reservation.tripId;
    this.count = reservation.count;
    this.purchaseDate = new Date(reservation.purchaseDate);
  }
}
