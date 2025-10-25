'use client';

import React from "react";
import styles from "./cardinfoforum.module.css";
import { useState, useEffect } from "react";

type CardProps = {
  cardType: string,
  cardNumber: string,
  expDate: string,
  onDelete: () => void;
  onChange: (updatedCard: { cardType: string; cardNumber: string; expDate: string }) => void;
};


export default function CardInfoForm({cardType, cardNumber, expDate, onDelete, onChange}: CardProps) {
  const [card, setCard] = useState({ cardType, cardNumber, expDate });

  // Whenever local state changes, notify parent
  useEffect(() => {
    onChange(card);
  }, [card]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCard((prev) => ({ ...prev, [name]: value }));
  };


  return (
    <div className={styles.mainDiv}>
      <label className={styles.label}>Card Number:</label>
      <input required onChange={handleChange} value={card.cardNumber} className={styles.inputField} type="text" id="cardNumber" name="cardNumber"/>
      <div>
        <div>
            <label>Card Type:</label>
            <input required onChange={handleChange} value={card.cardType} className={styles.inputField} type="text" id="cardType" name="cardType"/>
        </div>
        <div>
            <label>Exp. Date:</label>
            <input required onChange={handleChange} value={card.expDate} className={styles.inputField} type="text" id="expDate" name="expDate"/>
        </div>
      </div>
      <button type="button" className={styles.deleteButton} onClick={onDelete}>Delete</button>
    </div>
  );
}
