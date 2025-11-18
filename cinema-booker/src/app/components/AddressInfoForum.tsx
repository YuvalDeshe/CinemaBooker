'use client';
import React, { useState, useEffect } from "react";
import styles from "./addressinfoforum.module.css";
import AddressModel from "@/models/AddressModel";
import AddressController from "@/controllers/AddressController";

type Props = {
  address: AddressModel;
  onChange: (updatedAddress: AddressModel) => void;
};

export default function AddressInfoForum({ address, onChange }: Props) {
  const controller = new AddressController();
  const [stateAddress, setStateAddress] = useState(address);

  useEffect(() => {
    onChange(stateAddress);
  }, [stateAddress]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updated = controller.updateField({ ...stateAddress }, name, value);
    setStateAddress(updated);
  };

  return (
    <div className={styles.billingAddressContainer}>
      <label className={styles.subLabel}>Street Address:</label>
      <input value={stateAddress.street} name="street" onChange={handleChange} required className={styles.addressInputField} type="text" />
      
      <div className={styles.addressSubField}>
        <label className={styles.subLabel}>City:</label>
        <input value={stateAddress.city} name="city" onChange={handleChange} required className={styles.subInputField} type="text" />
        <label className={styles.subLabel}>State:</label>
        <input value={stateAddress.state} name="state" onChange={handleChange} required className={styles.subInputField} type="text" />
        <label className={styles.subLabel}>Zipcode:</label>
        <input value={stateAddress.zip} name="zip" onChange={handleChange} required className={styles.subInputField} type="text" />
      </div>
    </div>
  );
}
