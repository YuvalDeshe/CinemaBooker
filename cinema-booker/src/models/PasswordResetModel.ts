import { 
  PasswordValidationRules, 
  ValidationResult, 
  PasswordResetRequest,
  PasswordResetConfirmation 
} from '@/types/PasswordReset';

/**
 * Model class for password validation and reset operations
 */
export class PasswordResetModel {
  private static readonly DEFAULT_VALIDATION_RULES: PasswordValidationRules = {
    minLength: 8,
    requireLowercase: true,
    requireUppercase: true,
    requireNumber: true,
  };

  /**
   * Validates an email address format
   * @param email - Email to validate
   * @returns ValidationResult with validation status and error message if invalid
   */
  static validateEmail(email: string): ValidationResult {
    if (!email) {
      return { isValid: false, error: "Email is required" };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { isValid: false, error: "Please enter a valid email address" };
    }

    return { isValid: true };
  }

  /**
   * Validates password strength according to defined rules
   * @param password - Password to validate
   * @param rules - Optional custom validation rules
   * @returns ValidationResult with validation status and error message if invalid
   */
  static validatePassword(
    password: string, 
    rules: PasswordValidationRules = this.DEFAULT_VALIDATION_RULES
  ): ValidationResult {
    if (!password) {
      return { isValid: false, error: "Password is required" };
    }

    if (password.length < rules.minLength) {
      return { 
        isValid: false, 
        error: `Password must be at least ${rules.minLength} characters long` 
      };
    }

    if (rules.requireLowercase && !/(?=.*[a-z])/.test(password)) {
      return { 
        isValid: false, 
        error: "Password must contain at least one lowercase letter" 
      };
    }

    if (rules.requireUppercase && !/(?=.*[A-Z])/.test(password)) {
      return { 
        isValid: false, 
        error: "Password must contain at least one uppercase letter" 
      };
    }

    if (rules.requireNumber && !/(?=.*\d)/.test(password)) {
      return { 
        isValid: false, 
        error: "Password must contain at least one number" 
      };
    }

    return { isValid: true };
  }

  /**
   * Validates that two passwords match
   * @param password - Primary password
   * @param confirmPassword - Confirmation password
   * @returns ValidationResult with validation status and error message if they don't match
   */
  static validatePasswordMatch(password: string, confirmPassword: string): ValidationResult {
    if (password !== confirmPassword) {
      return { isValid: false, error: "Passwords do not match" };
    }

    return { isValid: true };
  }

  /**
   * Validates a password reset token
   * @param token - Reset token to validate
   * @returns ValidationResult with validation status and error message if invalid
   */
  static validateResetToken(token: string | null): ValidationResult {
    if (!token) {
      return { 
        isValid: false, 
        error: "Invalid or missing reset token. Please request a new password reset." 
      };
    }

    return { isValid: true };
  }

  /**
   * Creates a password reset request object
   * @param email - Email address for reset request
   * @returns PasswordResetRequest object
   */
  static createPasswordResetRequest(email: string): PasswordResetRequest {
    return { email: email.toLowerCase().trim() };
  }

  /**
   * Creates a password reset confirmation object
   * @param token - Reset token
   * @param password - New password
   * @returns PasswordResetConfirmation object
   */
  static createPasswordResetConfirmation(token: string, password: string): PasswordResetConfirmation {
    return { token, password };
  }

  /**
   * Gets the default password validation rules
   * @returns PasswordValidationRules object
   */
  static getDefaultValidationRules(): PasswordValidationRules {
    return { ...this.DEFAULT_VALIDATION_RULES };
  }
}