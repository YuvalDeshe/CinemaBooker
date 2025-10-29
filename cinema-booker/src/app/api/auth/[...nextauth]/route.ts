import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.isEmailVerified = (user as any).isEmailVerified;
        token.userType = (user as any).userType ?? (user as any).role ?? "USER";
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).isEmailVerified = token.isEmailVerified;
        (session.user as any).userType = token.userType;
      }
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("Validating credentials for:", credentials?.email);

        if (!credentials?.email || !credentials?.password) {
          console.log("Missing credentials.");
          return null;
        }

        const { email, password } = credentials;
        const trimmedEmail = email.trim();

        try {
          console.log(`Finding user: "${trimmedEmail}"`);

          const apiUrl = process.env.NEXT_PUBLIC_API_DOMAIN;
          const response = await fetch(`${apiUrl}/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          });

          const data = await response.json();

          if (!response.ok) {
            console.error("User not found:", trimmedEmail);
            return null;
          }

          const user = data.user;

          if (!user || !user.password) {
            console.error(`Password field missing for user ${user?.email}.`);
            return null;
          }

          console.log(`Comparing password for ${user.email}...`);
          const isPasswordCorrect = await bcrypt.compare(password, user.password);

          if (!isPasswordCorrect) {
            console.log(`Password incorrect for ${user.email}.`);
            return null;
          }

          console.log(`Credentials valid for ${user.email}.`);
          return {
            id: user._id.toString(),
            email: user.email,
            username: user.username,
            isEmailVerified: user.isEmailVerified ?? true,
            userType: user.userType ?? user.role ?? "USER",
          };
        } catch (error) {
          console.error("Network or parsing error during login:", error);
          return null;
        }
      },
    }),
  ],
});

export { handler as GET, handler as POST };