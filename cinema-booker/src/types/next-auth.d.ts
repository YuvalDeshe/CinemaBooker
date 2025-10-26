import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      isEmailVerified?: boolean;
      username?: string;
    } & DefaultSession["user"]
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