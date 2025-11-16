'use client';

import { useState } from "react";
import styles from "./styles.module.css";
import DateInputForm from "@/app/components/DateInputForm";

import { submitPromo } from "@/controllers/AddPromoController";

export default function AddPromo() {
  const [name, setName] = useState("");
  const [discountPercent, setDiscountPercent] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const resetForm = () => {
    setName("");
    setDiscountPercent("");
    setStartDate("");
    setEndDate("");
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await submitPromo(name, discountPercent, startDate, endDate);
      alert("✅ Promo code added successfully!");
      resetForm();
    } catch (err: any) {
      alert(`❌ ERROR: ${err.message}`);
    }
  };


  return (
    <div className={styles.mainDiv}>
      <h1 className={styles.addMovieHeading}>Add Promo</h1>
      <hr className={styles.hr}/>
      <form className={styles.formContainer} onSubmit={submitHandler}>
        <label className={styles.label}>Promo Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} required placeholder="e.g. NEWPROMO15" className={styles.inputField} name="title" type="text"/>
        <label className={styles.label}>Discount (%)</label>
        <div className={styles.runTimeContainer}>
          <input maxLength={3} value={discountPercent} onChange={(e) => setDiscountPercent(e.target.value)} required placeholder="0-100" className={styles.tinyInputField} name="title" type="number"/>
          <p className={styles.percentLabel}>%</p>
        </div>
        <hr className={styles.hr}/>
        <label className={styles.label}>Promo Start Date</label>
        <DateInputForm value={startDate} onChange={(date) => setStartDate(date ?? "")}/>
        <label className={styles.label}>Promo End Date</label>
        <DateInputForm value={endDate} onChange={(date) => setEndDate(date ?? "")}/>
        <hr className={styles.hr}/>
        <input className={styles.submitButton} type="submit" value="Submit"/>
      </form>
    </div>
  );
}