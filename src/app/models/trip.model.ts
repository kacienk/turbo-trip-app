import { BehaviorSubject, Observable } from 'rxjs';

export enum Currency {
  USD = 'dolar',
  PLN = 'zloty',
  EUR = 'euro',
}

export interface ITrip {
  name: string;
  destinationCountry: string;
  startDate: Date | string;
  endDate: Date | string;
  price: number;
  maxSpots: number;
  takenSpots: number;
  description: string;
  imageRef: string;
}

export class Trip implements ITrip {
  constructor(data: ITrip) {
    this.name = data.name;
    this.destinationCountry = data.destinationCountry;
    this.startDate = new Date(data.startDate);
    this.endDate = new Date(data.endDate);
    this.price = data.price;
    this.maxSpots = data.maxSpots;
    this.takenSpots = data.takenSpots;
    this.description = data.description;
    this.imageRef = data.imageRef;
    this.currency = Currency.USD;
    this.rating = 0;
    this.reservedSpots = 0;
  }

  name: string;
  destinationCountry: string;
  startDate: Date;
  endDate: Date;
  price: number;
  maxSpots: number;
  takenSpots: number;
  description: string;
  imageRef: string;
  currency: Currency;
  rating: number;
  reservedSpots: number;
}
