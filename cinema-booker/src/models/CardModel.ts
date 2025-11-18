export default class CardModel {
  cardType: string;
  cardNumber: string;
  expMonth: string;
  expYear: string;
  lastFour: string;
  isNew: boolean;
  _tempId: string;

  constructor({
    cardType = "debit",
    cardNumber = "",
    expMonth = "",
    expYear = "",
    isNew = true,
    _tempId = crypto.randomUUID(),
  } = {}) {
    this.cardType = cardType;
    this.cardNumber = cardNumber;
    this.expMonth = expMonth;
    this.expYear = expYear;
    this.lastFour = cardNumber.slice(-4) || "";
    this.isNew = isNew;
    this._tempId = _tempId;
  }
}
