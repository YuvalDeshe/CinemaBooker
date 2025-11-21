export class PromoCode {
  name: string;
  discountMultiplier: number;
  startDate: string;
  endDate: string;

  constructor({
    name,
    discountMultiplier,
    startDate,
    endDate,
  }: {
    name: string;
    discountMultiplier: number;
    startDate: string;
    endDate: string;
  }) {
    this.name = name;
    this.discountMultiplier = discountMultiplier;
    this.startDate = startDate;
    this.endDate = endDate;
  }
}
