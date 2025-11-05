'use client';

import React from 'react';
import styles from './customdropdown.module.css';

interface CustomDropdownProps {
  options: string[];
  value: string;
  onChange?: (value: string) => void;
}

export default function CustomDropdown({ options, value, onChange }: CustomDropdownProps) {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    if (onChange) onChange(newValue);
  };

  return (
    <div className={styles.dropdownContainer}>
      <select
        className={styles.dropdown}
        value={value}
        onChange={handleChange}
        required
      >
        <option value="" disabled>
          Select One
        </option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
