import React, {
  useState,
  useEffect,
  ChangeEvent,
  FocusEvent,
} from "react";
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
 * A controlled, typed React component that accepts and validates dates in MM/DD/YYYY format.
 */
const DateInputForm: React.FC<DateInputFormProps> = ({
  value = "",
  onChange = () => {},
  id = "date-input",
  name = "date",
  label,
}) => {
  const [text, setText] = useState<string>(value || "");
  const [touched, setTouched] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Sync with external value prop if it changes
  useEffect(() => {
    setText(value || "");
  }, [value]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const newValue = e.target.value;
    setText(newValue);

    if (onChange) {
      onChange(newValue.trim() === "" ? null : newValue);
    }
  };


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
          className={`${styles.input} ${
            error && touched ? styles.inputError : ""
          }`}
          placeholder="MM/DD/YYYY"
          value={text}
          onChange={handleChange}
          maxLength={10}
          minLength={8}
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
