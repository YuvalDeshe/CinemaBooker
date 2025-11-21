import React from "react";
import styles from "./dateinputform.module.css";
import { DateInputFormProps } from "@/models/DateInputFormPropsInterface";
import { useDateInputFormController } from "@/controllers/DateInputFormController";

const DateInputForm: React.FC<DateInputFormProps> = ({value = "", onChange = () => {}, id = "date-input", name = "date", label,}) => {
  const c = useDateInputFormController(value, onChange);
  return (
    <div className={styles.wrapper}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
      <div className={styles.inputRow}>
        <input
          id={id}
          required
          type="date"
          name={name}
          className={styles.input}
          placeholder="MM/DD/YYYY"
          value={c.text}
          onChange={c.handleChange}
          maxLength={10}
          minLength={8}
        />
      </div>
    </div>
  );
};

export default DateInputForm;
