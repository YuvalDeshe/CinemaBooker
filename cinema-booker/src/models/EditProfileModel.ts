// models/EditProfileModel.ts
import PaymentCard from "@/models/PaymentCardModel";
import Address from "@/models/AddressModel";
import User from "@/models/UserModel";

export default class EditProfileModel {
  user: User | null = null;

  constructor(user?: User) {
    if (user) this.user = user;
  }

  async fetchUser(userId: string): Promise<User | null> {
    try {
      const res = await fetch(`/api/users/${userId}`);
      if (!res.ok) throw new Error("Failed to fetch user");
      const data = await res.json();
      this.user = data;
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async updateUser(updatedUser: User): Promise<boolean> {
    if (!updatedUser._id) return false;
    try {
      const res = await fetch(`/api/users/${updatedUser._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });
      if (!res.ok) throw new Error("Failed to update profile");
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
