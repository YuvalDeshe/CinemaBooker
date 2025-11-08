'use client';

import { useState } from "react";
import styles from "./styles.module.css"
import DateInputForm from "@/app/components/DateInputForm";

export default function AddPromo() {

  type PromoCode = {
    name: String,
    discountMultiplier: Number,
    startDate: String,
    endDate: String,
  }

  const [name, setName] = useState("");
  const [discountPercent, setDiscountPercent] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

const isSecondDateLaterOrEqual = (startDate: string, endDate: string): boolean => {
  // Split dates into components
  const [startMonthStr, startDayStr, startYearStr] = startDate.split("/");
  const [endMonthStr, endDayStr, endYearStr] = endDate.split("/");

  const startYear = parseInt(startYearStr);
  const endYear = parseInt(endYearStr);
  const startMonth = parseInt(startMonthStr);
  const endMonth = parseInt(endMonthStr);
  const startDay = parseInt(startDayStr);
  const endDay = parseInt(endDayStr);

  // Validate numerical parsing
  if ([startYear, startMonth, startDay, endYear, endMonth, endDay].some(isNaN)) {
    return false;
  }

  // Create Date objects for direct comparison
  const start = new Date(startYear, startMonth - 1, startDay);
  const end = new Date(endYear, endMonth - 1, endDay);

  // start <= end
  return start.getTime() <= end.getTime();
};

const normalizeDate = (date: string): string => {
  // Input format: YYYY-MM-DD
  // Output format: MM/DD/YYYY

  const [year, month, day] = date.split("-");
  if (!year || !month || !day) return date; // fallback if format invalid
  return `${month}/${day}/${year}`;
};


const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    //Validation: Discount % provided is a valid number.
    console.log("DISCOUNT PERCENT: ", discountPercent);
    const discountNumber : number = parseInt(discountPercent);
    console.log("DISCOUNT NUMBER: ", discountNumber);
    let discountMultiplier: number;

    if (isNaN(discountNumber) || (discountNumber < 0 || discountNumber > 100)) {
      alert("❌ ERROR: Enter a valid discount % (0-100)");
      return;
    } else {
      discountMultiplier = ((100 - discountNumber) / 100);
    }

    //Normalize start/end dates so formatting is consistent across all documents.
    const normalizedStartDate = normalizeDate(startDate);
    const normalizedEndDate = normalizeDate(endDate);

    //Validation: startDate is earlier than endDate
    const areDatesValid : boolean = isSecondDateLaterOrEqual(normalizedStartDate, normalizedEndDate);

    if (!areDatesValid) {
      alert("❌ ERROR: Start date must be earlier or equal to end date.");
      return;
    }

    //VERIFICATION: The new promo must not overlap with an existing promo under the same name in the DB.
    try {
      const checkRes = await fetch(`/api/admin/addpromo?name=${encodeURIComponent(name)}`);
      console.log("CHECKRES CALLED");
      const { exists, promo } = await checkRes.json();

      if (exists) {
        //If the endDate of the existing promo is LATER than the startDate of the new promo...
        if (isSecondDateLaterOrEqual(normalizedStartDate, promo.endDate)) {
          //Then the endDate of the new promo MUST be earlier than the start date of the existing promo to be valid.
          //If that is NOT the case
          if(isSecondDateLaterOrEqual(promo.startDate, normalizedEndDate)) {
            alert("❌ ERROR: A promo code with that name already exists during that timeframe.");
            return;
          }
        }
      }
    } catch (err) {
      console.error("Error checking promo code:", err);
      alert("❌ Error verifying promo code name.");
      return;
    }

    //Create object
    const newPromoCode : PromoCode = {
      name: name,
      discountMultiplier: discountMultiplier,
      startDate: normalizedStartDate,
      endDate: normalizedEndDate,
    };

    console.log(newPromoCode);
    resetForm();

    try {
      const res = await fetch(`/api/admin/addpromo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPromoCode),
      });

      if (!res.ok) throw new Error("Failed to add promo code");

      alert("✅ Promo code added successfully!");
    } catch (error) {
      console.error(error);
      alert("❌ Error adding promo code.");
    }
  };

  const resetForm = () => {
    setName("");
    setDiscountPercent("");
    setStartDate("");
    setEndDate("");
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