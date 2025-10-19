'use client';

import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import CardInfoForum from "@/app/components/CardInfoForum";
import AddressInfoForum from "@/app/components/AddressInfoForum";

type PaymentCard = {
  cardType: string,
  cardNumber: string,
  expDate: string,
}

type Address = {
  street: string,
  city: string,
  state: string,
  zip: string,
}

type User = {
  id: string, //Idk if this should be string or something else.
  firstName: string,
  lastName: string,
  password: string,
  billingAddress: Address,
  paymentCards: PaymentCard[], //Might need to change this to an array of ObjectIDs if PaymentCards are stored in separate collection.
  email: string,
  isRegisteredForPromos: boolean,
  userType: string, //CUSTOMER, ADMIN
  userStatus: string, //ACTIVE, INACTIVE, SUSPENDED
};

//**NOTE:**: Replace hardcoded User object with the user currently logged in.
const user: User = {
  id: "1",
  firstName: "John",
  lastName: "Doe",
  password: "MyPassword12345",
  billingAddress: {
    street: "21 Jump St.",
    city: "San Francisco",
    state: "CA",
    zip: "94102"
  },
  paymentCards: [
    {
      cardType: "Mastercard",
      cardNumber: "1234-5678-9012-3456",
      expDate: "10/26",
    },
    {
      cardType: "Visa",
      cardNumber: "1111-5555-9999-3333",
      expDate: "3/29",
    },
  ],
  email: "johndoe123@gmail.com",
  isRegisteredForPromos: true,
  userType: "CUSTOMER",
  userStatus: "INACTIVE"
}

export default function EditProfile() {
  const [firstName, setFirstName] = useState<string>(user.firstName);
  const [lastName, setLastName] = useState<string>(user.lastName);
  const [billingAddress, setBillingAddress] = useState<Address>(user.billingAddress);
  const [cardsList, setCardsList] = useState<PaymentCard[]>(user.paymentCards)
  const [isRegisteredForPromos, setIsRegisteredForPromos] = useState(user.isRegisteredForPromos);
  const [oldPassword, setOldPassword] = useState<string>("")
  const [newPassword, setNewPassword] = useState<string>("")
  const [addressForumVisible, setAddressForumVisible] = useState<boolean>(!(billingAddress.street == "" && billingAddress.city == "" && billingAddress.state == "" && billingAddress.zip == ""));


  const numCards = cardsList.length;

  //Max cards is 3 in project instructions, but 4 in deliverable instructions?
  //Right now it maxes it at 3 max cards, but this can be easily changed.
  const buttonDisabled = numCards >= 3;

  //**NOTE**: Change this to update the user in the database.
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  // Step 1: Assume password stays the same
  let updatedPassword = user.password;

  // Step 2: Check if user entered something for new password
  if (newPassword.trim() !== "") {
    // Step 3: Validate old password first
    if (oldPassword === user.password) {
      updatedPassword = newPassword;
      console.log("✅ Password updated successfully!");
    } else {
      alert("❌ Old password is incorrect. No changes saved.");
      return; // stop form submission if password check fails
    }
  }

  // Step 4: Build the new updated user object
  const updatedUser: User = {
    ...user,
    firstName,
    lastName,
    billingAddress,
    paymentCards: cardsList,
    isRegisteredForPromos,
    password: updatedPassword,
  };

  // Step 5: Log or send updatedUser to backend
  console.log("✅ Updated User:", updatedUser);
  alert("Profile updated successfully!");
};


 const addNewCardHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const newCard: PaymentCard = {
      cardType: "",
      cardNumber: "",
      expDate: "",
    };

    setCardsList((prev) => {
      const updated = [...prev, newCard];
      return updated;
    });
  };

  const deleteCardHandler = (indexToDelete: number) => {
    setCardsList((prevCards) => prevCards.filter((_, index) => index !== indexToDelete));
  };

  const addAddressHandler = () => {
    setAddressForumVisible(true);
  }

  const removeAddressHandler = () => {
    setAddressForumVisible(false);

    const blankAddress: Address = {
      street: "",
      city: "",
      state: "",
      zip: "",
    }

    setBillingAddress(blankAddress)
  }

  return (
    <div className={styles.mainDiv}>
      <h1 className={styles.editProfileHeading}>Edit Profile</h1>
      <hr className={styles.hr}/>
      <p className={styles.email}>{user.email}</p>
      <form className={styles.forumContainer} onSubmit={submitHandler}>
        <label className={styles.label}>First Name:</label>
        <input required onChange={(e) => setFirstName(e.target.value)} className={styles.inputField} defaultValue={user.firstName} type="text" id="first name" name="first name"/>              
        <label className={styles.label}>Last Name:</label>
        <input required onChange={(e) => setLastName(e.target.value)} className={styles.inputField} defaultValue={user.lastName}type="text" id="last name" name="last name"/>
        <label className={styles.label}>Billing Address:</label>
        {addressForumVisible && <AddressInfoForum address={billingAddress} onChange={(updatedAddress: Address) => setBillingAddress(updatedAddress)}/>}
        {!addressForumVisible && (<button className={styles.addAddressButton} onClick={addAddressHandler}>
          <p>Add Address</p>
        </button>)}
        {addressForumVisible && (<button className={styles.deleteAddressButton} onClick={removeAddressHandler}>
          <p>Delete Address</p>
        </button>)}
         <div className={styles.promoContainer}>
          <label className={styles.label}>Register For Promotions</label>
          <input className={styles.checkbox}  onChange={(e) => setIsRegisteredForPromos(e.target.checked)} checked={isRegisteredForPromos} type="checkbox" id="register for promotions" name="register for promotions"
          />
        </div>
        <hr className={styles.hr}/>
        <h2 className={styles.label}>Payment Cards:</h2>
        {cardsList.map((card: PaymentCard, index: number) => (
          <CardInfoForum key={index} cardType={card.cardType} cardNumber={card.cardNumber} expDate={card.expDate} onDelete={() => deleteCardHandler(index)} onChange={(updatedCard: PaymentCard) => {
            const updatedCards = [...cardsList];
            updatedCards[index] = updatedCard;
            setCardsList(updatedCards);
          }}/>
        ))}
        <button className={buttonDisabled? (styles.addCardButtonDisabled) : (styles.addCardButton)} onClick={addNewCardHandler} disabled={buttonDisabled}>
          <p>Add Card</p>
        </button>
        {buttonDisabled && <p className={styles.noticeLabel}> ⚠️ Remove a payment card to add another.</p>}
        <hr className={styles.hr}/>
        <label className={styles.label}>Change Password:</label>
        <input type="password" onChange={(e) => setNewPassword(e.target.value)} className={styles.inputField} id="new password" name="new password"/>
        <label className={styles.label}>Confirm Old Password:</label>
        <input type="password" onChange={(e) => setOldPassword(e.target.value)} className={styles.inputField} id="confirm old password" name="confirm old password"/>
        <p className={styles.noteLabel} >Note: Changing your password requires you to input your old password</p>
        <input className={styles.addCardButton} type="submit" value="Submit" id="sub_button"/>
      </form>
    </div>
  );
}
