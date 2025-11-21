// Types and interfaces for password reset functionality

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordResetConfirmation {
  token: string;
  password: string;
}

export interface PasswordResetResponse {
  success: boolean;
  message: string;
  error?: string;
}

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export interface PasswordResetFormState {
  email: string;
  isLoading: boolean;
  message: string;
  error: string;
}

export interface NewPasswordFormState {
  password: string;
  confirmPassword: string;
  isLoading: boolean;
  error: string;
  success: boolean;
}

export interface PasswordValidationRules {
  minLength: number;
  requireLowercase: boolean;
  requireUppercase: boolean;
  requireNumber: boolean;
}