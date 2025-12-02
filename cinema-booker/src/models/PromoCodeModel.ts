export class PromoCode {
  _id?: string;
  name: string;
  priceMultiplier: number;
  startDate: string;
  endDate: string;

  constructor({
    _id,
    name,
    priceMultiplier,
    startDate,
    endDate,
  }: {
    _id?: string;
    name: string;
    priceMultiplier: number;
    startDate: string;
    endDate: string;
  }) {
    this._id = _id;
    this.name = name;
    this.priceMultiplier = priceMultiplier;
    this.startDate = startDate;
    this.endDate = endDate;
  }
}
