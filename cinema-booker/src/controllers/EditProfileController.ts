// controllers/EditProfileController.ts
import bcrypt from "bcryptjs";
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
