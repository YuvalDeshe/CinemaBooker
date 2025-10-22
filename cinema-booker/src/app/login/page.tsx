'use client';
import LoginForm from "@/app/components/LoginForm";

// TODO: (future deliverable) move this function to its own class to follow SOLID design principles and adhere to MVC framework
async function login(email: string, password: string) {
    try {
        console.log(`Attempting login for email: ${email}`);

        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            console.log("Login Successful! User data:", data.user);
            // TODO: test that the user is successfully put on the home page after login
            globalThis.location.href = '/';
            return { success: true, user: data.user };
        } else {
            console.error("Login Failed:", data.message);
            return { success: false, message: data.message };
        }
    } catch (error) {
        console.error("Network or parsing error during login:", error);
        return { success: false, message: "An unexpected network error occurred." };
    }
}

export default function Login() {
    return(
        <div>
            <LoginForm handleLogin={login}></LoginForm>
        </div>
    )
}
