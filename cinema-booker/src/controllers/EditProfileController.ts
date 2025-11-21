// controllers/EditProfileController.ts
import bcrypt from "bcryptjs";
import React, { useEffect, useState } from "react";
import EditProfileModel from "@/models/EditProfileModel";
import PaymentCard from "@/models/PaymentCardModel";
import Address from "@/models/AddressModel";
import User from "@/models/UserModel";

export default class EditProfileController {
  model: EditProfileModel;

  constructor(model: EditProfileModel) {
    this.model = model;
  }

  async validatePassword(oldPassword: string, userPassword: string): Promise<boolean> {
    return await bcrypt.compare(oldPassword, userPassword);
  }

  async saveUser(
    user: User,
    firstName: string,
    lastName: string,
    homeAddress: Address,
    cardsList: PaymentCard[],
    isRegisteredForPromos: boolean,
    newPassword: string
  ): Promise<boolean> {
    let updatedPassword = user.password;

    if (newPassword.trim() !== "" && user.password) {
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

    return await this.model.updateUser(updatedUser);
  }

  addCard(cardsList: PaymentCard[]): PaymentCard[] {
    if (cardsList.length >= 3) return cardsList;
    return [
      ...cardsList,
      {
        cardType: "",
        cardNumber: "",
        lastFour: "",
        expMonth: "",
        expYear: "",
        isNew: true,
        _tempId: crypto.randomUUID(),
      },
    ];
  }

  removeCard(cardsList: PaymentCard[], tempId: string): PaymentCard[] {
    return cardsList.filter((c) => c._tempId !== tempId);
  }

  updateCard(cardsList: PaymentCard[], updatedCard: PaymentCard): PaymentCard[] {
    return cardsList.map((c) => (c._tempId === updatedCard._tempId ? updatedCard : c));
  }
}

// Hook that centralizes the view state for the Edit Profile view.
export function useEditProfileController(
  model: EditProfileModel,
  paramsId: string | undefined,
  session: any,
  router: any
) {
  const controller = new EditProfileController(model);

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [homeAddress, setHomeAddress] = useState<Address>({ street: "", city: "", state: "", zip: "" });
  const [cardsList, setCardsList] = useState<PaymentCard[]>([]);
  const [isRegisteredForPromos, setIsRegisteredForPromos] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [addressForumVisible, setAddressForumVisible] = useState(false);

  // Only allow users to edit their own profiles
  useEffect(() => {
    if (session?.user && session.user.id !== paramsId) {
      router.push(`/user/${session.user.id}/profile/edit`);
    }
  }, [session, paramsId, router]);

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      console.log('controller fetchuser');
      setLoading(true);
      const data = await model.fetchUser(String(paramsId ?? ""));
      if (data) {
        setUser(data);
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setHomeAddress(data.homeAddress);
        setCardsList(
          data.paymentCard.map((card) => ({
            ...card,
            _tempId: // ensure temp id exists for frontend keyed lists
              // `crypto` may be available in the browser runtime; if not, fallback to timestamp
              typeof crypto !== "undefined" && (crypto as any).randomUUID ? (crypto as any).randomUUID() : `${Date.now()}-${Math.random()}`,
          }))
        );
        setIsRegisteredForPromos(data.isRegisteredForPromos);
        setAddressForumVisible(!!data.homeAddress?.street);
      }
      setLoading(false);
    };

    if (paramsId) fetchUser();
  // Intentionally omit `model` from deps because a new model instance
  // is often created by the caller on each render. Including it caused
  // the effect to re-run repeatedly (infinite fetch loop). Only
  // re-run when `paramsId` changes.
  }, [paramsId]);

  return {
    controller,
    user,
    setUser,
    loading,
    setLoading,
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
  };
}
