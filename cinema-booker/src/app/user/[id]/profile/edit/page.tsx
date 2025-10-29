'use client';

import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import CardInfoForum from "@/app/components/CardInfoForum";
import AddressInfoForum from "@/app/components/AddressInfoForum";
import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import ExistingCard from "@/app/components/ExistingCard";
import bcrypt from "bcryptjs";

type PaymentCard = {
  cardType: string;
  cardNumber: string;
  expMonth: string;
  expYear: string;
  lastFour: string;
  isNew: boolean;
};

type Address = {
  street: string;
  city: string;
  state: string;
  zip: string;
};

type User = {
  _id: string;
  firstName: string;
  lastName: string;
  password?: string;
  homeAddress: Address;
  paymentCard: PaymentCard[];
  email: string;
  isRegisteredForPromos: boolean;
  userType: string;
  userStatus: string;
};

export default function EditProfile() {
  const { data: session } = useSession();
  const params = useParams();
  const router = useRouter();
  let initialCards: PaymentCard[];

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Form states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [homeAddress, setHomeAddress] = useState<Address>({ street: "", city: "", state: "", zip: "" });
  const [cardsList, setCardsList] = useState<PaymentCard[]>([]);
  const [isRegisteredForPromos, setIsRegisteredForPromos] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [addressForumVisible, setAddressForumVisible] = useState(false);

  // only allow users to edit their own profiles
  useEffect(() => {
    if (session?.user && session.user.id !== params.id) {
      router.push(`/user/${session.user.id}/profile/edit`);
    }
  }, [session, params, router]);

  // Fetch user data from backend
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/users/${params.id}`);
        if (!res.ok) throw new Error("Failed to fetch user");
        const data = await res.json();

        setUser(data);
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setHomeAddress(data.homeAddress);
        console.log('payment cards: ', data.paymentCard);
        console.log('data: ', data);
        setCardsList(data.paymentCard);
        setIsRegisteredForPromos(data.isRegisteredForPromos);
        setAddressForumVisible(!!data.homeAddress?.street);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) fetchUser();
  }, [params.id]);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;

    // Validate password if changing
    let updatedPassword = user.password;
    console.log(`newPassword: ${newPassword.trim()}\nuser.password: ${user.password}\noldPassword: ${oldPassword}`)
    if (newPassword.trim() !== "" && user.password) {
      // if (oldPassword !== user.password) { // bcrypt.compare
      const isSamePassword = await bcrypt.compare(oldPassword, user.password);
      console.log(isSamePassword);
      if (!isSamePassword) {
        alert("❌ Old password is incorrect. No changes saved.");
        return;
      }
      updatedPassword = newPassword;
    }

    const updatedUser = {
      ...user,
      firstName,
      lastName,
      homeAddress,
      paymentCard: cardsList,
      isRegisteredForPromos,
      password: updatedPassword,
    };

    try {
      const res = await fetch(`/api/users/${user._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });

      if (!res.ok) throw new Error("Failed to update profile");

      alert("✅ Profile updated successfully!");
      router.push(`/`);
    } catch (error) {
      console.error(error);
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
          <button className={styles.addAddressButton} onClick={() => setAddressForumVisible(true)}>
            <p>Add Address</p>
          </button>
        )}
        {addressForumVisible && (
          <button
            className={styles.deleteAddressButton}
            onClick={() => {
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

        {cardsList?.map((card, index) => (
          !card.isNew ?
          <ExistingCard
            key={index}
            {...card}
            onDelete={() => setCardsList((prev) => prev.filter((_, i) => i !== index))}
            onChange={(updatedCard: PaymentCard) => {
              const updated = [...cardsList];
              updated[index] = updatedCard;
              setCardsList(updated);
            }}
          /> :
          <CardInfoForum
            key={index}
            {...card}
            onDelete={() => setCardsList((prev) => prev.filter((_, i) => i !== index))}
            onChange={(updatedCard: PaymentCard) => {
              const updated = [...cardsList];
              updated[index] = updatedCard;
              setCardsList(updated);
            }}
          />
        ))}

        <button
          className={cardsList?.length >= 3 ? styles.addCardButtonDisabled : styles.addCardButton}
          onClick={(e) => {
            e.preventDefault();
            if (cardsList.length < 3)
              setCardsList([...cardsList, { cardType: "", cardNumber: "", lastFour: "", expMonth: "", expYear: "", isNew: true }]);
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

        <input className={styles.addCardButton} type="submit" value="Submit" />
      </form>
    </div>
  );
}