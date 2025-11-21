"use client";

import { useState } from "react";
import BackgroundReel from "@/app/components/BackgroundReel";
import Link from "next/link";
import { PasswordResetController } from "@/controllers/PasswordResetController";
import { PasswordResetFormState } from "@/types/PasswordReset";

export default function ResetPassword() {
    const [formState, setFormState] = useState<PasswordResetFormState>({
        email: "",
        isLoading: false,
        message: "",
        error: "",
    });

    const handleInputChange = (email: string) => {
        setFormState(prev => ({
            ...prev,
            email,
            error: "", // Clear error when user types
            message: "", // Clear message when user types
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Set loading state
        setFormState(prev => ({
            ...prev,
            isLoading: true,
            error: "",
            message: "",
        }));

        // Use controller to handle the business logic
        const result = await PasswordResetController.requestPasswordReset(formState.email);

        // Update form state based on result
        setFormState(prev => ({
            ...prev,
            isLoading: false,
            message: result.success ? result.message : "",
            error: result.success ? "" : result.message,
        }));
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

                    {formState.error && (
                        <div className="mb-4 rounded-md border border-red-500/60 bg-red-500/10 px-3 py-2 text-sm text-red-200">
                            {formState.error}
                        </div>
                    )}

                    {formState.message && (
                        <div className="mb-4 rounded-md border border-green-500/60 bg-green-500/10 px-3 py-2 text-sm text-green-200">
                            {formState.message}
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
                                value={formState.email}
                                onChange={(e) => handleInputChange(e.target.value)}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={formState.isLoading}
                            className="w-full bg-blue-500 hover:bg-blue-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-md transition-all duration-200"
                        >
                            {formState.isLoading ? "Sending..." : "Send Reset Link"}
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