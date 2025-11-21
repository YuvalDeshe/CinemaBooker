"use client";

import { Suspense } from "react";
import { useLoginController } from "@/controllers/LoginController"; // Import Controller
import BackgroundReel from "@/app/components/BackgroundReel";
import Link from "next/link";

function LoginContent() {
  const {
    email,
    password,
    error,
    isLoading,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
  } = useLoginController();

  return (
      <div className="relative min-h-screen flex items-center justify-center bg-[#0b1221] text-white">
        <BackgroundReel />

        <div className="relative z-10 w-full max-w-md p-[1px] rounded-2xl bg-gradient-to-b from-blue-500/60 via-blue-400/20 to-transparent">
          <div className="bg-[#1b2235]/85 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-700/60 p-8">
            <h1 className="text-3xl font-semibold text-center mb-2">Login</h1>
            <p className="text-center text-sm text-gray-300 mb-6">
              Welcome back to <span className="font-medium">Cinema E-Booking</span>
            </p>

            {error && (
                <div className="mb-4 rounded-md border border-red-500/60 bg-red-500/10 px-3 py-2 text-sm text-red-200">
                  {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block mb-1 text-gray-300">
                  Email
                </label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    autoComplete="email"
                    className="w-full p-3 rounded-md bg-gray-100 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="you@example.com"
                    value={email}
                    onChange={handleEmailChange} // Uses handler from Controller
                />
              </div>

              <div>
                <label htmlFor="password" className="block mb-1 text-gray-300">
                  Password
                </label>
                <input
                    id="password"
                    type="password"
                    name="password"
                    required
                    autoComplete="current-password"
                    className="w-full p-3 rounded-md bg-gray-100 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="••••••••"
                    value={password}
                    onChange={handlePasswordChange} // Uses handler from Controller
                />
              </div>

              <a href="/resetPassword" className="text-blue-300 hover:text-blue-200 underline">Forgot your password?</a>

              <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-500 hover:bg-blue-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-md transition-all duration-200"
              >
                {isLoading ? "Logging in…" : "Log In"}
              </button>
            </form>

            <p className="text-center mt-6 text-gray-300">
              Don’t have an account?{" "}
              <Link href="/register" className="text-blue-300 hover:text-blue-200 underline">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
  );
}

export default function LoginPage() {
  return (
      <Suspense fallback={<div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">Loading...</div>}>
        <LoginContent />
      </Suspense>
  );
}