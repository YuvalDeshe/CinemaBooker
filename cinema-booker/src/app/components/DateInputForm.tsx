// File: DateInputForm.tsx

import React, { useState, useEffect, useRef, KeyboardEvent, ChangeEvent, FocusEvent } from "react";
import styles from "./dateinputform.module.css";

interface DateInputFormProps {
  value?: string;
  onChange?: (dateString: string | null) => void;
  id?: string;
  name?: string;
  label?: string;
}

/**
 * DateInputForm
 * A controlled React component that accepts and validates dates in MM/DD/YYYY format.
 */
const DateInputForm: React.FC<DateInputFormProps> = ({
  value = "",
  onChange = () => {},
  id = "date-input",
  name = "date",
  label = "Date (MM/DD/YYYY)",
}) => {
  const [text, setText] = useState<string>(value || "");
  const [touched, setTouched] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setText(value || "");
  }, [value]);

  const validate = (str: string): string => {
    if (!str) return "";
    const m = str.match(/^\s*(\d{1,2})\/(\d{1,2})\/(\d{4})\s*$/);
    if (!m) return "Invalid format — use MM/DD/YYYY";
    const mm = parseInt(m[1], 10);
    const dd = parseInt(m[2], 10);
    const yyyy = parseInt(m[3], 10);

    if (mm < 1 || mm > 12) return "Month must be between 01 and 12";
    if (yyyy < 1000 || yyyy > 9999) return "Year must be four digits";

    const daysInMonth = new Date(yyyy, mm, 0).getDate();
    if (dd < 1 || dd > daysInMonth) return `Day must be between 01 and ${daysInMonth}`;

    return "";
  };

  const emitChange = (nextText: string) => {
    const err = validate(nextText);
    setError(err);
    if (!err && nextText.trim() !== "") {
      onChange(nextText);
    } else {
      onChange(null);
    }
  };

  const formatInput = (raw: string): string => {
    const digits = raw.replace(/[^0-9]/g, "").slice(0, 8);
    let out = digits;
    if (digits.length >= 3 && digits.length <= 4) {
      out = digits.slice(0, 2) + "/" + digits.slice(2);
    } else if (digits.length > 4) {
      out = digits.slice(0, 2) + "/" + digits.slice(2, 4) + "/" + digits.slice(4);
    }
    return out;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const raw = e.target.value;
    const formatted = formatInput(raw);
    setText(formatted);
    emitChange(formatted);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>): void => {
    setTouched(true);
    emitChange(text);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      inputRef.current?.blur();
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.inputRow}>
        <input
          id={id}
          name={name}
          ref={inputRef}
          className={`${styles.input} ${error && touched ? styles.inputError : ""}`}
          placeholder="MM/DD/YYYY"
          value={text}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          inputMode="numeric"
          autoComplete="off"
        />
      </div>
      {error && touched && (
        <p id={`${id}-error`} className={styles.error} role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default DateInputForm;