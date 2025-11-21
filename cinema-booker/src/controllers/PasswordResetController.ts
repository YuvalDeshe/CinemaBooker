import { PasswordResetModel } from '@/models/PasswordResetModel';
import { 
  PasswordResetResponse, 
  PasswordResetRequest, 
  PasswordResetConfirmation 
} from '@/types/PasswordReset';

/**
 * Controller class for handling password reset operations
 * Manages business logic and API communication
 */
export class PasswordResetController {
  
  /**
   * Handles password reset request
   * @param email - Email address to send reset link to
   * @returns Promise<PasswordResetResponse> - Result of the reset request
   */
  static async requestPasswordReset(email: string): Promise<PasswordResetResponse> {
    try {
      // Validate email format
      const emailValidation = PasswordResetModel.validateEmail(email);
      if (!emailValidation.isValid) {
        return {
          success: false,
          message: emailValidation.error || "Invalid email address",
        };
      }

      // Create request object
      const resetRequest: PasswordResetRequest = PasswordResetModel.createPasswordResetRequest(email);

      // Make API call
      const response = await fetch('/api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(resetRequest),
      });

      const data = await response.json();

      if (response.ok) {
        return {
          success: true,
          message: data.message || "If an account with that email exists, we've sent you a password reset link. Please check your email.",
        };
      } else {
        return {
          success: false,
          message: data.message || "An error occurred. Please try again.",
        };
      }
    } catch (error) {
      console.error("Password reset request error:", error);
      return {
        success: false,
        message: "An error occurred. Please try again.",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  /**
   * Handles new password confirmation
   * @param token - Reset token
   * @param password - New password
   * @param confirmPassword - Password confirmation
   * @returns Promise<PasswordResetResponse> - Result of the password reset
   */
  static async confirmPasswordReset(
    token: string, 
    password: string, 
    confirmPassword: string
  ): Promise<PasswordResetResponse> {
    try {
      // Validate token
      const tokenValidation = PasswordResetModel.validateResetToken(token);
      if (!tokenValidation.isValid) {
        return {
          success: false,
          message: tokenValidation.error || "Invalid reset token",
        };
      }

      // Validate password strength
      const passwordValidation = PasswordResetModel.validatePassword(password);
      if (!passwordValidation.isValid) {
        return {
          success: false,
          message: passwordValidation.error || "Invalid password",
        };
      }

      // Validate password match
      const matchValidation = PasswordResetModel.validatePasswordMatch(password, confirmPassword);
      if (!matchValidation.isValid) {
        return {
          success: false,
          message: matchValidation.error || "Passwords do not match",
        };
      }

      // Create confirmation object
      const resetConfirmation: PasswordResetConfirmation = 
        PasswordResetModel.createPasswordResetConfirmation(token, password);

      // Make API call
      const response = await fetch('/api/reset-password/confirm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(resetConfirmation),
      });

      const data = await response.json();

      if (response.ok) {
        return {
          success: true,
          message: data.message || "Password has been successfully updated.",
        };
      } else {
        return {
          success: false,
          message: data.message || "Failed to reset password. Please try again.",
        };
      }
    } catch (error) {
      console.error("Password reset confirmation error:", error);
      return {
        success: false,
        message: "An error occurred. Please try again.",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  /**
   * Gets password validation rules for display
   * @returns Array of password requirement strings
   */
  static getPasswordRequirements(): string[] {
    const rules = PasswordResetModel.getDefaultValidationRules();
    const requirements: string[] = [];

    if (rules.minLength) {
      requirements.push(`At least ${rules.minLength} characters long`);
    }
    if (rules.requireUppercase && rules.requireLowercase) {
      requirements.push("Contains uppercase and lowercase letters");
    }
    if (rules.requireNumber) {
      requirements.push("Contains at least one number");
    }

    return requirements;
  }
}