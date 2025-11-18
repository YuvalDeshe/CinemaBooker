"use client";

import { useRegisterController } from "@/controllers/RegisterController"; // Import the Controller
import RegisterForm from "@/app/components/RegisterForm"; // Import the View Component
import Link from "next/link";

export default function RegisterPage() {
        const {
                error,
                success,
                handleRegister
        } = useRegisterController();
        return (
            <>
                    {!!error && (
                        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 rounded-md border border-red-500/60 bg-red-500/10 px-3 py-2 text-sm text-red-200">
                                {error}
                        </div>
                    )}
                    {!!success && (
                        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 rounded-md border border-green-500/60 bg-green-500/10 px-3 py-2 text-sm text-green-200">
                                {success}
                        </div>
                    )}


                    <RegisterForm
                        handleRegister={handleRegister}
                    />
                    <p className="mt-4 text-center">
                            Already have an account? <Link href="/login" className="text-blue-500 hover:underline">Login</Link>
                    </p>
            </>
        );
}