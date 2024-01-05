export class Reservation {
  userId: string;
  tripId: string;
  count: number;

  constructor(userId: string, tripId: string, count: number) {
    this.userId = userId;
    this.tripId = tripId;
    this.count = count;
  }
}
