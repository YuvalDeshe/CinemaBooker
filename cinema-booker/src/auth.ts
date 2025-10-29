import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const { auth, handlers, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.isEmailVerified = user.isEmailVerified;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.isEmailVerified = token.isEmailVerified as boolean;
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      async authorize(credentials): Promise<any> {
                console.log(" Validating credentials for:", credentials?.email);

                if (!credentials?.email || !credentials?.password) {
                    console.log("Missing credentials.");
                    return null;
                }

                const { email, password } = credentials;
                const trimmedEmail = email.trim();

                let user;
                // fetch the user from the database
                try {
                    console.log(`Finding user: "${trimmedEmail}"`);

                    const apiUrl = process.env.NEXT_PUBLIC_API_DOMAIN
                    const response = await fetch(`${apiUrl}/login`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ email, password }),
                    });

                    const data = await response.json();

                    if (response.ok) {
                        user = data.user;
                        // console.log('user: ', user);
                    } else {
                        console.error("User not found: ", trimmedEmail);
                        return null;
                    }

                    if (!user.password) {
                        console.error(` Password field missing for user ${user.email}. Check DB/Schema.`);
                        return null;
                    }

                    console.log(` Comparing password for ${user.email}...`);
                    const isPasswordCorrect = await bcrypt.compare(password, user.password);

                    if (!isPasswordCorrect) {
                        console.log(` Password incorrect for ${user.email}.`);
                        return null;
                    }

                    console.log(` Credentials valid for ${user.email}.`);
                    return {
                        id: user._id.toString(),
                        email: user.email,
                        isEmailVerified: user.isEmailVerified || true, // Default to true for existing users
                    };

                } catch (error) {
                    console.error("Network or parsing error during login:", error);
                    return { success: false, message: "An unexpected network error occurred." };
                }
            },
    }),
  ],
});