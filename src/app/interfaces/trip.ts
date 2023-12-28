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
}