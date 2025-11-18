import CardModel from "@/models/CardModel";

export default class CardController {
  updateCard(card: CardModel, field: string, value: string): CardModel {
    if (field === "cardNumber") {
      card.lastFour = value.slice(-4);
    }
    (card as any)[field] = value;
    return { ...card };
  }
}
