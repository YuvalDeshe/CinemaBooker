"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import BackgroundReel from "@/app/components/BackgroundReel";
import Link from "next/link";
import { PasswordResetController } from "@/controllers/PasswordResetController";
import { PasswordResetModel } from "@/models/PasswordResetModel";
import { NewPasswordFormState } from "@/types/PasswordReset";

function NewPasswordContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    const [formState, setFormState] = useState<NewPasswordFormState>({
        password: "",
        confirmPassword: "",
        isLoading: false,
        error: "",
        success: false,
    });

    // Validate token on component mount
    useEffect(() => {
        const tokenValidation = PasswordResetModel.validateResetToken(token);
        if (!tokenValidation.isValid) {
            setFormState(prev => ({
                ...prev,
                error: tokenValidation.error || "Invalid reset token",
            }));
        }
    }, [token]);

    const handlePasswordChange = (password: string) => {
        setFormState(prev => ({
            ...prev,
            password,
            error: "", // Clear error when user types
        }));
    };

    const handleConfirmPasswordChange = (confirmPassword: string) => {
        setFormState(prev => ({
            ...prev,
            confirmPassword,
            error: "", // Clear error when user types
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!token) {
            setFormState(prev => ({
                ...prev,
                error: "Invalid or missing reset token. Please request a new password reset.",
            }));
            return;
        }

        // Set loading state
        setFormState(prev => ({
            ...prev,
            isLoading: true,
            error: "",
        }));

        // Use controller to handle the business logic
        const result = await PasswordResetController.confirmPasswordReset(
            token,
            formState.password,
            formState.confirmPassword
        );

        if (result.success) {
            setFormState(prev => ({
                ...prev,
                isLoading: false,
                success: true,
                error: "",
            }));

            // Redirect to login after success
            setTimeout(() => {
                router.push('/login');
            }, 3000);
        } else {
            setFormState(prev => ({
                ...prev,
                isLoading: false,
                error: result.message,
            }));
        }
    };

    // Get password requirements from controller
    const passwordRequirements = PasswordResetController.getPasswordRequirements();

    if (!token) {
        return (
            <div className="relative min-h-screen flex items-center justify-center bg-[#0b1221] text-white">
                <BackgroundReel />
                <div className="relative z-10 w-full max-w-md p-[1px] rounded-2xl bg-gradient-to-b from-red-500/60 via-red-400/20 to-transparent">
                    <div className="bg-[#1b2235]/85 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-700/60 p-8 text-center">
                        <h1 className="text-3xl font-semibold mb-4 text-red-400">Invalid Token</h1>
                        <p className="text-gray-300 mb-6">This password reset link is invalid or has expired.</p>
                        <Link 
                            href="/resetPassword" 
                            className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2.5 px-6 rounded-md transition-all duration-200"
                        >
                            Request New Reset Link
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    if (formState.success) {
        return (
            <div className="relative min-h-screen flex items-center justify-center bg-[#0b1221] text-white">
                <BackgroundReel />
                <div className="relative z-10 w-full max-w-md p-[1px] rounded-2xl bg-gradient-to-b from-green-500/60 via-green-400/20 to-transparent">
                    <div className="bg-[#1b2235]/85 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-700/60 p-8 text-center">
                        <h1 className="text-3xl font-semibold mb-4 text-green-400">Password Reset Successful!</h1>
                        <p className="text-gray-300 mb-6">Your password has been successfully updated. You will be redirected to the login page in a few seconds.</p>
                        <Link 
                            href="/login" 
                            className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2.5 px-6 rounded-md transition-all duration-200"
                        >
                            Go to Login
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-[#0b1221] text-white">
            <BackgroundReel />

            <div className="relative z-10 w-full max-w-md p-[1px] rounded-2xl bg-gradient-to-b from-blue-500/60 via-blue-400/20 to-transparent">
                <div className="bg-[#1b2235]/85 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-700/60 p-8">
                    <h1 className="text-3xl font-semibold text-center mb-2">Set New Password</h1>
                    <p className="text-center text-sm text-gray-300 mb-6">
                        Enter your new password below.
                    </p>

                    {formState.error && (
                        <div className="mb-4 rounded-md border border-red-500/60 bg-red-500/10 px-3 py-2 text-sm text-red-200">
                            {formState.error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="password" className="block mb-1 text-gray-300">
                                New Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                required
                                autoComplete="new-password"
                                className="w-full p-3 rounded-md bg-gray-100 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Enter your new password"
                                value={formState.password}
                                onChange={(e) => handlePasswordChange(e.target.value)}
                            />
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block mb-1 text-gray-300">
                                Confirm New Password
                            </label>
                            <input
                                id="confirmPassword"
                                type="password"
                                required
                                autoComplete="new-password"
                                className="w-full p-3 rounded-md bg-gray-100 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Confirm your new password"
                                value={formState.confirmPassword}
                                onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                            />
                        </div>

                        <div className="text-xs text-gray-400 bg-gray-800/40 p-3 rounded-md">
                            <p className="font-medium mb-1">Password requirements:</p>
                            <ul className="space-y-1">
                                {passwordRequirements.map((requirement, index) => (
                                    <li key={index}>• {requirement}</li>
                                ))}
                            </ul>
                        </div>

                        <button
                            type="submit"
                            disabled={formState.isLoading}
                            className="w-full bg-blue-500 hover:bg-blue-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-md transition-all duration-200"
                        >
                            {formState.isLoading ? "Updating Password..." : "Update Password"}
                        </button>
                    </form>

                    <div className="text-center mt-6">
                        <p className="text-gray-300">
                            Remember your password?{" "}
                            <Link href="/login" className="text-blue-300 hover:text-blue-200 underline">
                                Back to Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function NewPasswordPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">Loading...</div>}>
            <NewPasswordContent />
        </Suspense>
    );
}