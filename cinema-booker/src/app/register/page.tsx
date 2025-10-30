"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import RegisterForm from "@/app/components/RegisterForm"; 
import User from "@/types/User";

import Link from "next/link";

/* 
TODO: Change this to render the LoginForm component instead 
      of the raw JSX.
*/
export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    isRegisteredForPromos: false,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleRegister = async (user: User) => {
    setError("");
    setSuccess("");
    setIsLoading(true);

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          username: formData.username,
          password: formData.password,
          isRegisteredForPromos: formData.isRegisteredForPromos,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message || "Registration successful! Please check your email to verify your account.");
        // Clear form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          username: "",
          password: "",
          confirmPassword: "",
          isRegisteredForPromos: false,
        });
        // Redirect to login after a delay
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (error) {
      setError("An error occurred during registration");
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

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

      <RegisterForm handleRegister={handleRegister} />
    </>
  );
}
