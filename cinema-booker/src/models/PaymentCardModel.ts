export default class PaymentCard {
  cardType: string;
  cardNumber: string;
  expMonth: string;
  expYear: string;
  lastFour: string;
  isNew: boolean;
  _tempId?: string;

  constructor({
    cardType,
    cardNumber,
    expMonth,
    expYear,
    lastFour,
    isNew,
    _tempId
  }: {
  cardType: string;
  cardNumber: string;
  expMonth: string;
  expYear: string;
  lastFour: string;
  isNew: boolean;
  _tempId?: string;
  }) {
    this.cardType = cardType;
    this.cardNumber = cardNumber;
    this.expMonth = expMonth;
    this.expYear = expYear;
    this.lastFour = lastFour;
    this.isNew = isNew;
    this._tempId = _tempId
  }
}
