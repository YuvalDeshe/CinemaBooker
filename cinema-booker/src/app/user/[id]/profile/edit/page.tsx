'use client';

import React from "react";
import styles from "./styles.module.css";
import CardInfoForum from "@/app/components/CardInfoForum";
import AddressInfoForum from "@/app/components/AddressInfoForum";
import ExistingCard from "@/app/components/ExistingCard";
import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import EditProfileModel from "@/models/EditProfileModel";
import { useEditProfileController } from "@/controllers/EditProfileController";
import Address from "@/models/AddressModel";
import ExistingCardModel from "@/models/ExistingCardModel";
import CardModel from "@/models/CardModel";

export default function EditProfile() {
  const { data: session } = useSession();
  const params = useParams();
  const router = useRouter();

  const model = new EditProfileModel();
  const {
    controller,
    user,
    loading,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    homeAddress,
    setHomeAddress,
    cardsList,
    setCardsList,
    isRegisteredForPromos,
    setIsRegisteredForPromos,
    oldPassword,
    setOldPassword,
    newPassword,
    setNewPassword,
    addressForumVisible,
    setAddressForumVisible,
  } = useEditProfileController(model, params?.id ? String(params.id) : undefined, session, router);

  // State, redirect and fetching are handled by `useEditProfileController` in the controller file.

  // Handle form submission
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    let confirmation = confirm("Are you sure you want to edit your profile?");
    if (confirmation == false) return;
    e.preventDefault();
    if (!user) return;

    if (newPassword.trim() !== "" && user.password !== undefined) {
      const isValid = await controller.validatePassword(oldPassword, user.password);
      if (!isValid) {
        alert("❌ Old password is incorrect. No changes saved.");
        return;
      }
    }

    const success = await controller.saveUser(
      user,
      firstName,
      lastName,
      homeAddress,
      cardsList,
      isRegisteredForPromos,
      newPassword
    );

    if (success) {
      alert("✅ Profile updated successfully!");
      if (session) router.push(`/user/${session.user.id}/profile`);
      else router.push('/')
    } else {
      alert("❌ Error updating profile.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>User not found.</p>;

  return (
    <div className={styles.mainDiv}>
      <h1 className={styles.editProfileHeading}>Edit Profile</h1>
      <hr className={styles.hr} />
      <p className={styles.email}>{user.email}</p>

      <form className={styles.forumContainer} onSubmit={submitHandler}>
        <label className={styles.label}>First Name:</label>
        <input
          required
          onChange={(e) => setFirstName(e.target.value)}
          className={styles.inputField}
          value={firstName}
          type="text"
        />

        <label className={styles.label}>Last Name:</label>
        <input
          required
          onChange={(e) => setLastName(e.target.value)}
          className={styles.inputField}
          value={lastName}
          type="text"
        />

        <label className={styles.label}>Home Address:</label>
        {addressForumVisible && (
          <AddressInfoForum
            address={homeAddress}
            onChange={(updatedAddress: Address) => setHomeAddress(updatedAddress)}
          />
        )}
        {!addressForumVisible && (
          <button
            className={styles.addAddressButton}
            onClick={(e) => { e.preventDefault(); setAddressForumVisible(true); }}
          >
            <p>Add Address</p>
          </button>
        )}
        {addressForumVisible && (
          <button
            className={styles.deleteAddressButton}
            onClick={(e) => {
              e.preventDefault();
              setAddressForumVisible(false);
              setHomeAddress({ street: "", city: "", state: "", zip: "" });
            }}
          >
            <p>Delete Address</p>
          </button>
        )}

        <div className={styles.promoContainer}>
          <label className={styles.label}>Register For Promotions</label>
          <input
            className={styles.checkbox}
            onChange={(e) => setIsRegisteredForPromos(e.target.checked)}
            checked={isRegisteredForPromos}
            type="checkbox"
          />
        </div>

        <hr className={styles.hr} />
        <h2 className={styles.label}>Payment Cards:</h2>

        {cardsList?.map((card) =>
          !card.isNew ? (
            <ExistingCard
              key={card._tempId}
              card={new ExistingCardModel(card)}
              onDelete={() => setCardsList(controller.removeCard(cardsList, card._tempId ?? ''))}
              onChange={(updatedCard) => setCardsList(controller.updateCard(cardsList, updatedCard))}
            />
          ) : (
            <CardInfoForum
              key={card._tempId}
              card={new CardModel(card)}
              onDelete={() => setCardsList(controller.removeCard(cardsList, card._tempId ?? ''))}
              onChange={(updatedCard) => setCardsList(controller.updateCard(cardsList, updatedCard))}
            />
          )
        )}

        <button
          className={cardsList?.length >= 3 ? styles.addCardButtonDisabled : styles.addCardButton}
          onClick={(e) => {
            e.preventDefault();
            setCardsList(controller.addCard(cardsList));
          }}
          disabled={cardsList?.length >= 3}
        >
          <p>Add Card</p>
        </button>

        <hr className={styles.hr} />
        <label className={styles.label}>New Password:</label>
        <input
          type="password"
          onChange={(e) => setNewPassword(e.target.value)}
          className={styles.inputField}
        />
        <label className={styles.label}>Old Password:</label>
        <input
          type="password"
          onChange={(e) => setOldPassword(e.target.value)}
          className={styles.inputField}
        />

        <input className={styles.submit} type="submit" value="Submit" />
      </form>
    </div>
  );
}
