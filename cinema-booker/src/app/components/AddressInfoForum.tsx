'use client';

import React from "react";
import styles from "./addressinfoforum.module.css";

type Address = {
  street: string;
  city: string;
  state: string;
  zip: string;
};

type BillingAddressFormProps = {
  address: Address;
  onChange: (updatedAddress: Address) => void;
};

export default function AddressInfoForum({ address, onChange }: BillingAddressFormProps) {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({ ...address, [name]: value });
  };

  return (
    <div className={styles.billingAddressContainer}>
      <label className={styles.subLabel}>Street Address:</label>
      <input onChange={handleChange} value={address.street} name="street" className={styles.addressInputField} type="text" required/>
      <div className={styles.addressSubField}>
        <label className={styles.subLabel}>City:</label>
        <input onChange={handleChange} value={address.city} name="city" className={styles.subInputField} type="text" required/>
        <label className={styles.subLabel}>State:</label>
        <input onChange={handleChange} value={address.state} name="state" className={styles.subInputField} type="text" required/>
        <label className={styles.subLabel}>Zipcode:</label>
        <input onChange={handleChange} value={address.zip} name="zip" className={styles.subInputField} type="text" required/>
      </div>
    </div>
  );
}
