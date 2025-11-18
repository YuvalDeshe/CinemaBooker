'use client';
import React, { useState, useEffect } from "react";
import styles from "./cardinfoforum.module.css";
import PaymentCard from "@/models/PaymentCardModel";

type CardProps = PaymentCard & {
  onDelete: () => void;
  onChange: (updatedCard: PaymentCard) => void;
};

export default function CardInfoForum({ cardType = "debit", cardNumber = "", expMonth = "", expYear = "", isNew = true, _tempId, onDelete, onChange }: CardProps) {
  const [card, setCard] = useState({
    cardType,
    cardNumber,
    expMonth,
    expYear,
    lastFour: cardNumber.slice(-4) || "",
    isNew,
    _tempId
  });

  // Only notify parent when actual changes occur
  useEffect(() => {
    onChange(card);
  }, [card]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;
    if (name.startsWith("cardType")) name = "cardType";

    setCard((prev) => ({
      ...prev,
      [name]: value,
      lastFour: name === "cardNumber" ? value.slice(-4) : prev.lastFour
    }));
  };

  return (
    <div className={styles.mainDiv}>
      <label className={styles.label}>Card Number:</label>
      <input
        required
        placeholder="1234 1234 1234 1234"
        onChange={handleChange}
        value={card.cardNumber}
        className={styles.inputField}
        type="text"
        name="cardNumber"
      />

      <div>
        <div>
          <label>Card Type:</label>
          <input
            type="radio"
            required
            checked={card.cardType === 'debit'} // ✅ use state
            onChange={handleChange}
            name="cardType"
            value="debit"
            className="h-4 w-4 m-2"
          /> Debit
          <input
            type="radio"
            required
            checked={card.cardType === 'credit'} // ✅ use state
            onChange={handleChange}
            name="cardType"
            value="credit"
            className="h-4 w-4 ml-2"
          /> Credit
        </div>
        <div>
          <label>Exp. Date:</label>
          <input
            required
            onChange={handleChange}
            value={card.expMonth}
            placeholder="MM"
            className={styles.inputField}
            type="text"
            name="expMonth"
          />
          / 
          <input
            required
            onChange={handleChange}
            value={card.expYear}
            placeholder="YYYY"
            className={styles.inputField}
            type="text"
            name="expYear"
          />
        </div>
      </div>

      <button type="button" className={styles.deleteButton} onClick={onDelete}>
        Delete
      </button>
    </div>
  );
}
