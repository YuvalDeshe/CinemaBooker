"use client";

import { useState } from "react";
import BackgroundReel from "@/app/components/BackgroundReel";
import Link from "next/link";

export default function ResetPassword() {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setMessage("");
        setIsLoading(true);

        try {
            const response = await fetch('/api/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage("If an account with that email exists, we've sent you a password reset link. Please check your email.");
            } else {
                setError(data.message || "An error occurred. Please try again.");
            }
        } catch (error) {
            setError("An error occurred. Please try again.");
            console.error("Reset password error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-[#0b1221] text-white">
            <BackgroundReel />

            <div className="relative z-10 w-full max-w-md p-[1px] rounded-2xl bg-gradient-to-b from-blue-500/60 via-blue-400/20 to-transparent">
                <div className="bg-[#1b2235]/85 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-700/60 p-8">
                    <h1 className="text-3xl font-semibold text-center mb-2">Reset Password</h1>
                    <p className="text-center text-sm text-gray-300 mb-6">
                        Enter your email address and we&apos;ll send you a link to reset your password.
                    </p>

                    {error && (
                        <div className="mb-4 rounded-md border border-red-500/60 bg-red-500/10 px-3 py-2 text-sm text-red-200">
                            {error}
                        </div>
                    )}

                    {message && (
                        <div className="mb-4 rounded-md border border-green-500/60 bg-green-500/10 px-3 py-2 text-sm text-green-200">
                            {message}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block mb-1 text-gray-300">
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                required
                                autoComplete="email"
                                className="w-full p-3 rounded-md bg-gray-100 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Enter your email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-blue-500 hover:bg-blue-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-md transition-all duration-200"
                        >
                            {isLoading ? "Sending..." : "Send Reset Link"}
                        </button>
                    </form>

                    <div className="text-center mt-6 space-y-2">
                        <p className="text-gray-300">
                            Remember your password?{" "}
                            <Link href="/login" className="text-blue-300 hover:text-blue-200 underline">
                                Back to Login
                            </Link>
                        </p>
                        <p className="text-gray-300">
                            Don&apos;t have an account?{" "}
                            <Link href="/register" className="text-blue-300 hover:text-blue-200 underline">
                                Register
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}