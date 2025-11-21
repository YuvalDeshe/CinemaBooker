'use client';
import React, { useState, useEffect } from "react";
import styles from "./cardinfoforum.module.css";
import CardModel from "@/models/CardModel";
import CardController from "@/controllers/CardController";

type Props = {
  card: CardModel;
  onDelete: () => void;
  onChange: (updatedCard: CardModel) => void;
};

export default function CardInfoForum({ card, onDelete, onChange }: Props) {
  const controller = new CardController();
  const [stateCard, setStateCard] = useState<CardModel>(card);

  useEffect(() => {
    onChange(stateCard);
  }, [stateCard]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updated = controller.updateCard({ ...stateCard }, name, value);
    setStateCard(updated);
  };

  return (
    <div className={styles.mainDiv}>
      <label className={styles.label}>Card Number:</label>
      <input
        required
        placeholder="1234 1234 1234 1234"
        value={stateCard.cardNumber}
        onChange={handleChange}
        name="cardNumber"
        className={styles.inputField}
      />

      <div>
        <label>Card Type:</label>
        <input
          type="radio"
          checked={stateCard.cardType === 'debit'}
          onChange={handleChange}
          name="cardType"
          value="debit"
        /> Debit
        <input
          type="radio"
          checked={stateCard.cardType === 'credit'}
          onChange={handleChange}
          name="cardType"
          value="credit"
        /> Credit
      </div>

      <div>
        <label>Exp. Date:</label>
        <input
          required
          value={stateCard.expMonth}
          placeholder="MM"
          onChange={handleChange}
          name="expMonth"
          className={styles.inputField}
        /> / 
        <input
          required
          value={stateCard.expYear}
          placeholder="YYYY"
          onChange={handleChange}
          name="expYear"
          className={styles.inputField}
        />
      </div>

      <button type="button" className={styles.deleteButton} onClick={onDelete}>Delete</button>
    </div>
  );
}
