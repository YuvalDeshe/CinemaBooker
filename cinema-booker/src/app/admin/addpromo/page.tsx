'use client';

import { useAddPromoController } from "@/controllers/AddPromoController";
import styles from "./styles.module.css";
import DateInputForm from "@/app/components/DateInputForm";

export default function AddPromo() {
  const c = useAddPromoController();

  return (
    <div className={styles.mainDiv}>
      <h1 className={styles.addMovieHeading}>Add Promo</h1>
      <hr className={styles.hr}/>
      <form className={styles.formContainer} onSubmit={c.submitHandler}>
        <label className={styles.label}>Promo Name</label>
        <input value={c.name} onChange={(e) => c.setName(e.target.value)} required placeholder="e.g. NEWPROMO15" className={styles.inputField} name="title" type="text"/>
        <label className={styles.label}>Discount (%)</label>
        <div className={styles.runTimeContainer}>
          <input maxLength={3} value={c.discountPercent} onChange={(e) => c.setDiscountPercent(e.target.value)} required placeholder="0-100" className={styles.tinyInputField} name="title" type="number"/>
          <p className={styles.percentLabel}>%</p>
        </div>
        <hr className={styles.hr}/>
        <label className={styles.label}>Promo Start Date</label>
        <DateInputForm value={c.startDate} onChange={(date) => c.setStartDate(date ?? "")}/>
        <label className={styles.label}>Promo End Date</label>
        <DateInputForm value={c.endDate} onChange={(date) => c.setEndDate(date ?? "")}/>
        <hr className={styles.hr}/>
        <input className={styles.submitButton} type="submit" value="Submit"/>
      </form>
    </div>
  );
}