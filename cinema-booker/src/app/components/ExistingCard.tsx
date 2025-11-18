'use client';
import React from "react";
import styles from "./cardinfoforum.module.css";
import ExistingCardModel from "@/models/ExistingCardModel";

type Props = {
  card: ExistingCardModel;
  onDelete: () => void;
  onChange: (updatedCard: ExistingCardModel) => void;
};

export default function ExistingCard({ card, onDelete }: Props) {
  return (
    <div className={styles.mainDiv}>
      <h1 className="text-lg underline">Existing Card:</h1>
      <label className={styles.label}>Card Number:</label>
      <input
        disabled
        value={`●●●● ●●●● ●●●● ${card.lastFour}`}
        className={styles.inputField}
        type="text"
      />

      <div>
        <label>Card Type:</label>
        <input disabled type="radio" checked={card.cardType === 'debit'} /> Debit
        <input disabled type="radio" checked={card.cardType === 'credit'} /> Credit
      </div>

      <div>
        <label>Exp. Date:</label>
        <input disabled value={card.expMonth} className={styles.inputField} /> / 
        <input disabled value={card.expYear} className={styles.inputField} />
      </div>

      <button type="button" className={styles.deleteButton} onClick={onDelete}>Delete</button>
    </div>
  );
}
