'use client';

import React from "react";
import styles from "./cardinfoforum.module.css";
import { useState, useEffect, useId } from "react";

type CardProps = {
  cardType: string,
  cardNumber: string,
  expMonth: string,
  expYear: string,
  lastFour: string,
  onDelete: () => void;
  onChange: (updatedCard: { cardType: string; cardNumber: string; expMonth: string, expYear: string, lastFour: string, isNew: boolean }) => void;
};


export default function ExistingCard({ cardType, cardNumber, expMonth, expYear, lastFour, onDelete, onChange }: CardProps) {
  const uniqueId = useId();
  const isNew = false;
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
      <h1 className="text-lg underline">Existing Card:</h1>
      <label className={styles.label}>Card Number:</label>
      <input disabled placeholder="1234 1234 1234 1234" required onChange={handleChange} value={`●●●●●●●●●●●● ${card.lastFour}`} className={styles.inputField} type="text" id="cardNumber" name="cardNumber" />
      <div>
        <div>
          <label>Card Type:</label>
          <input disabled placeholder={card.cardType} type="radio" required checked={cardType === 'debit'} onChange={handleChange} name={`cardType-${uniqueId}`} value="debit" className="h-4 w-4 m-2" />
          Debit
          <label className="inline-flex items-center gap-2 text-gray-200">
            <input disabled type="radio" required checked={cardType === 'credit'} onChange={handleChange} name={`cardType-${uniqueId}`} value="credit" className="h-4 w-4 ml-2" />
            Credit
          </label>
        </div>
        <div>
          <label>Exp. Date:</label>
          <input disabled required onChange={handleChange} value={card.expMonth} placeholder="MM" className={styles.inputField} type="text" id="expDate" name="expMonth" />
          / <input disabled required onChange={handleChange} value={card.expYear} placeholder="YYYY" className={styles.inputField} type="text" id="expDate" name="expYear" />
        </div>
      </div>
      <button type="button" className={styles.deleteButton} onClick={onDelete}>Delete</button>
    </div>
  );
}