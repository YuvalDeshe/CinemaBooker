export default class Address {
  street: string;
  city: string;
  state: string;
  zip: string;

  constructor({
    street,
    city,
    state,
    zip,
  }: {
    street: string;
    city: string;
    state: string;
    zip: string;
  }) {
    this.street = street;
    this.city = city;
    this.state = state;
    this.zip = zip;
  }
}
