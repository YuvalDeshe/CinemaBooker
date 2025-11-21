import { signIn, getSession} from "next-auth/react";

interface LoginApiSuccess {
    user: {
        email: string;
        userType: "ADMIN" | "USER";
    };
}

export class LoginService {

    public static async verifyCredentials(email: string, password: string): Promise<LoginApiSuccess> {
        const loginResponse = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const loginData = await loginResponse.json();

        if (!loginResponse.ok) {
            if (loginResponse.status === 403 && loginData.requiresVerification) {
                throw new Error("Please verify your email address before logging in. Check your email for a verification link.");
            } else if (loginResponse.status === 401) {
                throw new Error("Invalid email or password");
            } else {
                throw new Error(loginData.message || "Login failed due to an unexpected server issue.");
            }
        }

        return loginData as LoginApiSuccess;
    }

    public static async nextAuthSignIn(email: string, password: string): Promise<void> {
        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (result?.error) {
            console.error("NextAuth sign-in error:", result.error);
            throw new Error("Authentication failed after initial verification. Please try again.");
        }
    }

    public static async getCurrentSession(): Promise<any> {
        return getSession();
    }
}