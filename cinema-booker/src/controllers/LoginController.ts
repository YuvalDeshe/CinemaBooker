"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LoginService } from "@/models/LoginModel";

export const useLoginController = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectUrl = searchParams.get('redirect');
    const time = searchParams.get('time');

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            await LoginService.verifyCredentials(email, password);
            await LoginService.nextAuthSignIn(email, password);
            const session = await LoginService.getCurrentSession();

            const role =
                (session?.user as any)?.userType ||
                (session?.user as any)?.role ||
                "USER";

            if (role === "ADMIN") {
                router.push("/admin");
            } else if (redirectUrl) {
                const finalUrl = time ? `${redirectUrl}?time=${encodeURIComponent(time)}` : redirectUrl;
                router.push(finalUrl);
            } else {
                router.push("/");
            }

            router.refresh();

        } catch (err: any) {
            setError(err.message || "An unexpected error occurred during login.");
            console.error("Login process error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        email,
        password,
        error,
        isLoading,
        handleEmailChange,
        handlePasswordChange,
        handleSubmit,
    };
};