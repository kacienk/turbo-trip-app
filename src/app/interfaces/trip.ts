export enum Currency {
  USD = "dolar",
  PLN = "zloty",
  EUR = "euro",
}

export interface Trip {
  name: string,
  destinationCountry: string,
  startDate: Date,
  endDate: Date,
  price: number,
  maxSpots: number,
  takenSpots: number,
  description: string,
  imageRef: string
  currency: Currency
}