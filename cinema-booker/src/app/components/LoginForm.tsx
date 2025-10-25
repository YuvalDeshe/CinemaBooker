"use client";
import { useState } from "react";
import BackgroundReel from "@/app/components/BackgroundReel";

type LoginFormProps = {
  handleLogin: (email: string, password: string) => Promise<void> | void;
};

export default function LoginForm({ handleLogin }: LoginFormProps) {
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErr(null);
    const data = new FormData(e.currentTarget);
    const email = String(data.get("email") ?? "");
    const password = String(data.get("password") ?? "");
    try {
      setLoading(true);
      await handleLogin(email, password);
    } catch (e: any) {
      setErr(e?.message ?? "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#0b1221] text-white">
      <BackgroundReel />

      <div className="relative z-10 w-full max-w-md p-[1px] rounded-2xl bg-gradient-to-b from-blue-500/60 via-blue-400/20 to-transparent">
        <div className="bg-[#1b2235]/85 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-700/60 p-8">
          <h1 className="text-3xl font-semibold text-center mb-2">Login</h1>
          <p className="text-center text-sm text-gray-300 mb-6">
            Welcome back to <span className="font-medium">Cinema E-Booking</span>
          </p>

          {err && (
            <div className="mb-4 rounded-md border border-red-500/60 bg-red-500/10 px-3 py-2 text-sm text-red-200">
              {err}
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-4">
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
              />
            </div>

            <div>
              <label htmlFor="password" className="block mb-1 text-gray-300">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPw ? "text" : "password"}
                  name="password"
                  required
                  autoComplete="current-password"
                  className="w-full p-3 pr-10 rounded-md bg-gray-100 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPw((s) => !s)}
                  className="absolute inset-y-0 right-2 my-auto px-2 rounded-md text-gray-700/80 hover:text-gray-900 focus:outline-none"
                  aria-label={showPw ? "Hide password" : "Show password"}
                  tabIndex={-1}
                >
                  {showPw ? "🙈" : "👁️"}
                </button>
              </div>

    
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 hover:bg-blue-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-md transition-all duration-200"
            >
              {loading ? "Logging in…" : "Log In"}
            </button>
          </form>

          <p className="text-center mt-6 text-gray-300">
            Don’t have an account?{" "}
            <a href="/register" className="text-blue-300 hover:text-blue-200 underline">
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}