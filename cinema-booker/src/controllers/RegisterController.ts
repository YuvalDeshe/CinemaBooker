import { useState } from "react";
import { useRouter } from "next/navigation";
import User from "@/types/User";
import { RegisterService } from "@/models/RegisterService";

export const initialFormData = {
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    isRegisteredForPromos: false,
};

export const useRegisterController = () => {
    const [formData, setFormData] = useState(initialFormData);
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

        try {
            await RegisterService.registerUser(user);

            setSuccess("Registration successful! Redirecting to login...");
            router.push('/login');

        } catch (err: any) {
            setError(err.message || "An unexpected error occurred during registration.");
            console.error("Registration process error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        formData,
        error,
        success,
        isLoading,
        handleChange,
        handleRegister,
    };
};