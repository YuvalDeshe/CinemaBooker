'use client';

import React from "react";
import styles from "./cardinfoforum.module.css";
import { useState, useEffect } from "react";

type CardProps = {
  cardType: string,
  cardNumber: string,
  expMonth: string,
  expYear: string,
  lastFour: string,
  isNew: boolean,
  onDelete: () => void;
  onChange: (updatedCard: { cardType: string; cardNumber: string; lastFour: string; expMonth: string, expYear: string, isNew: boolean }) => void;
};


export default function CardInfoForm({ cardType, cardNumber, expMonth, expYear, isNew, onDelete, onChange }: CardProps) {
  const lastFour = String(cardType.split('-4'));
  isNew = true;
  const [card, setCard] = useState({ cardType, cardNumber, expMonth, expYear, lastFour, isNew });

  // Whenever local state changes, notify parent
  useEffect(() => {
    onChange(card);
  }, [card]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  let { name, value } = e.target;

  // Normalize radio names like "cardType-new" → "cardType"
  if (name.startsWith("cardType")) name = "cardType";

  setCard((prev) => ({ ...prev, [name]: value }));
};



  return (
    <div className={styles.mainDiv}>
      <label className={styles.label}>Card Number:</label>
      <input required placeholder="1234 1234 1234 1234" onChange={handleChange} value={card.cardNumber} className={styles.inputField} type="text" id="cardNumber" name="cardNumber" />
      <div>
        <div>
          <label>Card Type:</label>
          <input type="radio" required checked={cardType === 'debit'} onChange={handleChange} name={`cardType-${card.cardNumber || "new"}`} value="debit" className="h-4 w-4 m-2" />
          Debit
          <label className="inline-flex items-center gap-2 text-gray-200">
            <input type="radio" required checked={cardType === 'credit'} onChange={handleChange} name={`cardType-${card.cardNumber || "new"}`} value="credit" className="h-4 w-4 ml-2" />
            Credit
          </label>
        </div>
        <div>
          <label>Exp. Date:</label>
          <input required onChange={handleChange} value={card.expMonth} placeholder="MM" className={styles.inputField} type="text" id="expDate" name="expMonth" />
          / <input required onChange={handleChange} value={card.expYear} placeholder="YYYY" className={styles.inputField} type="text" id="expDate" name="expYear" />
        </div>
      </div>
      <button type="button" className={styles.deleteButton} onClick={onDelete}>Delete</button>
    </div>
  );
}
