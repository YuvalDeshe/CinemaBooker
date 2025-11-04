'use client';

import React from "react";
import styles from "./actorinfoform.module.css";
import { useState, useEffect } from "react";

export default function ActorInfoForm() {

  return (
    <div className={styles.mainDiv}>
      <label className={styles.label}>Actor: </label>
      <input required placeholder="John Doe" className={styles.inputField} type="text" id="cardNumber" name="cardNumber" />
      <button type="button" className={styles.deleteButton}>Delete</button>
    </div>
  );
}
