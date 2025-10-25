import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "@/models/userSchema";
import connectMongoDB from "@/app/mongodb";
import { apiBaseUrl } from "next-auth/client/_utils";

const authOptions: AuthOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
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
                    };

                } catch (error) {
                    console.error("Network or parsing error during login:", error);
                    return { success: false, message: "An unexpected network error occurred." };
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }: any) {
            if (user) {
                token.id = user.id;
                token.username = user.email;
            }
            return token;
        },
        async session({ session, token }: any) {
            if (token && session.user) {
                session.user.id = token.id as string;
                session.user.name = token.email as string;
            }
            return session;
        },
    },
};

const handler = NextAuth(authOptions);

// Export the handler for Next.js App Router HTTP methods
export { handler as GET, handler as POST, handler as auth };
