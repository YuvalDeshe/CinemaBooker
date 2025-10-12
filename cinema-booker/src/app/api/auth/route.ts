import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "@/models/userSchema"
import connectMongoDB from "@/app/mongodb"

export const {
    handlers: { GET, POST},
    auth,
    signIn,
    signOut,
} = NextAuth({
    session: {
        strategy: "jwt"
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password"},
            },
            async authorize(credentials): Promise<any> {
                console.log("Validating  credentials for:", credentials?.email);

                if (!credentials?.email || !credentials?.password) {
                    console.log("Missing credentials.");
                    return null;
                }

                const { email, password } = credentials;
                const trimmedEmail = email.trim();

                try {
                    await connectMongoDB();
                    console.log(`Finding user: "${trimmedEmail}"`);

                    const user = await User.findOne({ email: trimmedEmail })
                                            .select('+password')
                                            .lean();
                    
                    if (!user) {
                        console.log(`User not found: "${trimmedEmail}"`)
                        return null;
                    }

                    if (!user.password) {
                        console.error(`Password field missing for user ${user.email}. Check DB/Schema.`)
                        return null;
                    }

                    console.log(`Comparing password for ${user.email}`)
                    const isPasswordCorrect = await bcrypt.compare(password, user.password);

                    if (!isPasswordCorrect) {
                        console.log(`Password incorrect for ${user.email}.`)
                        return null;
                    }

                    console.log(`Credentials valid for ${user.email}.`)
                    return {
                        id: user._id.toString(),
                        email: user.email
                    };
                } catch (error) {
                    console.error("Unexpected error during authorization:", error);
                    return null;
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }: { token: any; user?: any }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
            }
            return token;
        },
        async session({ session, token }) {
            if (token && session.user) {
                session.user.id = token.id as string;
                session.user.email = token.email as string;
            }
            return session;
        }
    }
})