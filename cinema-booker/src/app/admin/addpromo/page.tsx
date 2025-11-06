'use client';

import { useState } from "react";
import styles from "./styles.module.css"
import DateInputForm from "@/app/components/DateInputForm";
import { error } from "console";

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

  const checkDateFormatting = (startDate : String, endDate : String): boolean => {
    if (startDate.charAt(2) == '/' && startDate.charAt(5) == '/' && endDate.charAt(2) == '/' && endDate.charAt(5) == '/') {
      return true;
    }
    return false;
  }



  const verifyDate = (date: string): boolean => {
    // Check basic format
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(date)) return false;

    const month = parseInt(date.substring(0, 2));
    const day = parseInt(date.substring(3, 5));
    const year = parseInt(date.substring(6));

    if (isNaN(month) || isNaN(day) || isNaN(year)) return false;

    // Month validity
    if (month < 1 || month > 12) return false;

    // Days in each month
    const daysInMonth = [31, (year % 4 === 0 ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const maxDays = daysInMonth[month - 1];

    // Day validity
    if (day < 1 || day > maxDays) return false;

    return true;
  };


  const validateDates = (startDate : String, endDate : String): boolean => {
    //Throw error if start year is later than end year.
    if (parseInt(startDate.substring(6)) > parseInt(endDate.substring(6))) {
      return false;
    }

    //If years are equal...
    if (parseInt(startDate.substring(6)) == parseInt(endDate.substring(6))) {
      //... and start month is later then end month, throw error
      if (parseInt(startDate.substring(0, 2)) > parseInt(endDate.substring(0, 2))) {
        return false;
      }

      //If year AND month are equal
      if (parseInt(startDate.substring(0, 2)) == parseInt(endDate.substring(0, 2))) {
        if (parseInt(startDate.substring(3, 5)) >= parseInt(endDate.substring(3, 5))) {
          return false;
        }
      }
    }
    return true;
  } 

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      //Validation: Code with same name already exists in DB, don't add it.
      /**
      try {
        const checkRes = await fetch("/api/admin/addpromo", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name }),
        });

        const { exists } = await checkRes.json();

        if (exists) {
          alert("❌ ERROR: A promo code with that name already exists.");
          return;
        }
      } catch (err) {
        console.error("Error checking promo code:", err);
        alert("❌ Error verifying promo code name.");
        return;
      }
      */

      //Validation: Discount % provided is a valid number.
      const discountNumber : number = parseInt(discountPercent);
      let discountMultiplier: number;

      if (isNaN(discountNumber) || (discountNumber < 0 || discountNumber > 100)) {
        alert("❌ ERROR: Enter a valid discount % (0-100)");
        return;
      } else {
        discountMultiplier = 1 - (discountNumber * .01);
      }

      //Validation: Dates are properly formatted with slashes
      const areDatesFormatted : boolean = checkDateFormatting(startDate, endDate)
      if (!areDatesFormatted) {
        alert("❌ ERROR: Improper Date Formatting (must be MM/DD/YYYY).");
        return;
      }

      //Validation: Dates are numbers and exist
      if (!verifyDate(startDate) || !verifyDate(endDate)) {
        alert("❌ ERROR: Atleast one of the provided dates is not valid or doesn't exist.");
        return;
      }


      //Validation: startDate is earlier than endDate
      const areDatesValid : boolean = validateDates(startDate, endDate);

      if (!areDatesValid) {
        alert("❌ ERROR: Start date must be earlier than end date.");
        return;
      }

      //Create object
      const newPromoCode : PromoCode = {
        name: name,
        discountMultiplier: discountMultiplier,
        startDate: startDate,
        endDate: endDate,
      };

      console.log(newPromoCode);
      resetForm();

      /**
      try {
        const res = await fetch(`/api/admin/addmovie`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newMovie),
        });
  
        if (!res.ok) throw new Error("Failed to add movie");
  
        alert("✅ Movie added successfully!");
      } catch (error) {
        console.error(error);
        alert("❌ Error adding movie.");
      }
            */
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
          <input maxLength={3} value={discountPercent} onChange={(e) => setDiscountPercent(e.target.value)} required placeholder="0-100" className={styles.tinyInputField} name="title" type="text"/>
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