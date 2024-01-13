export class Rating {
  userId: string;
  rate: number;

  constructor(userId: string, rate: number) {
    this.userId = userId;
    this.rate = rate;
  }
}
