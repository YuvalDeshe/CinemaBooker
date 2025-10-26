<<<<<<< HEAD
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
=======
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      isEmailVerified?: boolean;
      username?: string;
    } & DefaultSession["user"]
>>>>>>> emailVerification
  }

  interface User {
    id?: string;
<<<<<<< HEAD
=======
    isEmailVerified?: boolean;
    username?: string;
>>>>>>> emailVerification
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    email?: string;
<<<<<<< HEAD
=======
    isEmailVerified?: boolean;
    username?: string;
>>>>>>> emailVerification
  }
}