import { EmailVerificationModel } from '@/models/EmailVerificationModel';
import { EmailVerificationResponse, EmailVerificationState } from '@/types/EmailVerification';

/**
 * Controller class for handling email verification operations
 * Manages business logic and API communication
 */
export class EmailVerificationController {

  /**
   * Handles the complete email verification process
   * @param token - The verification token from URL parameters
   * @returns Promise<EmailVerificationState> - Complete verification state for UI
   */
  static async verifyEmail(token: string | null): Promise<EmailVerificationState> {
    try {
      // Sanitize and validate the token
      const sanitizedToken = EmailVerificationModel.sanitizeToken(token);
      const tokenValidation = EmailVerificationModel.validateToken(sanitizedToken);

      if (!tokenValidation.isValid) {
        return {
          status: "error",
          message: tokenValidation.error || "Invalid verification token",
        };
      }

      // Make API call to verify the email
      const response = await fetch(`/api/verify-email?token=${encodeURIComponent(sanitizedToken!)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      let responseData;
      try {
        responseData = await response.json();
      } catch (parseError) {
        console.error("Error parsing verification response:", parseError);
        return {
          status: "error",
          message: "Invalid response from server. Please try again.",
        };
      }

      // Determine verification status
      const status = EmailVerificationModel.getVerificationStatus(response, responseData);
      const message = EmailVerificationModel.getVerificationMessage(responseData);
      const redirectTo = EmailVerificationModel.getRedirectDestination(responseData);

      // Create verification state
      const verificationState: EmailVerificationState = {
        status,
        message,
      };

      if (redirectTo) {
        verificationState.redirectTo = redirectTo;
      }

      return verificationState;

    } catch (error) {
      console.error("Email verification error:", error);
      return {
        status: "error",
        message: "A network error occurred. Please check your connection and try again.",
      };
    }
  }

  /**
   * Handles automatic redirect after successful verification
   * @param redirectTo - The destination URL to redirect to
   * @param delay - Delay in milliseconds before redirect (default: 3000)
   * @returns Promise that resolves after the delay
   */
  static async handleRedirect(redirectTo: string, delay: number = 3000): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (typeof window !== 'undefined') {
          window.location.href = redirectTo;
        }
        resolve();
      }, delay);
    });
  }

  /**
   * Gets user-friendly status messages for different verification states
   * @param status - The verification status
   * @returns Object with title and description for the status
   */
  static getStatusMessages(status: EmailVerificationState['status']): {
    title: string;
    description: string;
  } {
    switch (status) {
      case "loading":
        return {
          title: "Verifying Your Email",
          description: "Please wait while we verify your email address...",
        };

      case "success":
        return {
          title: "Email Verified Successfully!",
          description: "Your account is now active. You will be redirected to the login page shortly.",
        };

      case "expired":
        return {
          title: "Verification Link Expired",
          description: "Your verification link has expired. You will be redirected to register a new account.",
        };

      case "error":
        return {
          title: "Verification Failed",
          description: "We couldn't verify your email address. Please check your link or register again.",
        };

      default:
        return {
          title: "Email Verification",
          description: "Processing your email verification request...",
        };
    }
  }

  /**
   * Creates a formatted API response for consistent error handling
   * @param success - Whether the operation was successful
   * @param message - The response message
   * @param additionalData - Any additional response data
   * @returns EmailVerificationResponse object
   */
  static createResponse(
    success: boolean, 
    message: string, 
    additionalData?: Partial<EmailVerificationResponse>
  ): EmailVerificationResponse {
    return {
      success,
      message,
      ...additionalData,
    };
  }
}