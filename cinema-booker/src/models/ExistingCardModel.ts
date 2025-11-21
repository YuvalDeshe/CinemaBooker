export default class ExistingCardModel {
  cardType: string;
  cardNumber: string;
  expMonth: string;
  expYear: string;
  lastFour: string;
  isNew: boolean;
  _tempId: string;

  constructor({ cardType, cardNumber, expMonth, expYear, lastFour, _tempId = crypto.randomUUID() }: any) {
    this.cardType = cardType;
    this.cardNumber = cardNumber;
    this.expMonth = expMonth;
    this.expYear = expYear;
    this.lastFour = lastFour;
    this.isNew = false;
    this._tempId = _tempId;
  }
}
