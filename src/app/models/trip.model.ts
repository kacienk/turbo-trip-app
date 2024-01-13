import { BehaviorSubject, Observable } from 'rxjs';

export interface ITrip {
  id: string;
  name: string;
  destinationCountry: string;
  startDate: Date | string;
  endDate: Date | string;
  price: number;
  maxSpots: number;
  description: string;
  imageRef: string;
}

export class Trip implements ITrip {
  constructor(data: ITrip) {
    this.id = data.id;
    this.name = data.name;
    this.destinationCountry = data.destinationCountry;
    this.startDate = new Date(data.startDate);
    this.endDate = new Date(data.endDate);
    this.price = data.price;
    this.maxSpots = data.maxSpots;
    this.description = data.description;
    this.imageRef = data.imageRef;
    this.rating = 0;
  }

  id: string;
  name: string;
  destinationCountry: string;
  startDate: Date;
  endDate: Date;
  price: number;
  maxSpots: number;
  description: string;
  imageRef: string;
  rating: number;
}
