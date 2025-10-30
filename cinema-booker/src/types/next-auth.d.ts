import NextAuth from "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      isEmailVerified?: boolean;
    };
  }

  interface User {
    id?: string;
    isEmailVerified?: boolean;
    username?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    email?: string;
    isEmailVerified?: boolean;
    username?: string;
  }
}