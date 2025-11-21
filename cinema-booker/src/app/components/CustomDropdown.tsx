'use client';

import React from 'react';
import styles from './customdropdown.module.css';
import { useCustomDropdownController } from '@/controllers/CustomDropdownController';
import { CustomDropdownProps } from '@/models/CustomDropdownPropsInterface';

export default function CustomDropdown({ options, value, onChange }: CustomDropdownProps) {
  const { handleChange } = useCustomDropdownController(onChange);

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
