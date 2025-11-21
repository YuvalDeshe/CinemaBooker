// Types and interfaces for email verification functionality

export interface EmailVerificationRequest {
  token: string;
}

export interface EmailVerificationResponse {
  success: boolean;
  message: string;
  verified?: boolean;
  expired?: boolean;
  redirectTo?: string;
  error?: string;
}

export interface EmailVerificationState {
  status: "loading" | "success" | "error" | "expired";
  message: string;
  redirectTo?: string;
}

export interface TokenValidationResult {
  isValid: boolean;
  error?: string;
}