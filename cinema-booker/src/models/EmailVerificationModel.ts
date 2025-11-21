import { TokenValidationResult } from '@/types/EmailVerification';

/**
 * Model class for email verification operations and business logic
 */
export class EmailVerificationModel {
  
  /**
   * Validates an email verification token format and presence
   * @param token - The verification token to validate
   * @returns TokenValidationResult with validation status and error message if invalid
   */
  static validateToken(token: string | null): TokenValidationResult {
    if (!token) {
      return { 
        isValid: false, 
        error: "Verification token is missing. Please check your email for a valid verification link." 
      };
    }

    if (typeof token !== 'string' || token.trim().length === 0) {
      return { 
        isValid: false, 
        error: "Invalid verification token format. Please use the link from your email." 
      };
    }

    // Basic token format validation (could be enhanced based on your token generation strategy)
    if (token.length < 10) {
      return { 
        isValid: false, 
        error: "Verification token appears to be invalid. Please check your email for the correct link." 
      };
    }

    return { isValid: true };
  }

  /**
   * Determines the appropriate user message based on API response
   * @param responseData - The response data from the verification API
   * @returns User-friendly message string
   */
  static getVerificationMessage(responseData: any): string {
    // Handle success case
    if (responseData.verified) {
      return responseData.message || "Email verified successfully! Your account is now active.";
    }

    // Handle expired token case
    if (responseData.expired) {
      return responseData.message || "Your verification link has expired. Please register again.";
    }

    // Handle other error cases
    return responseData.message || "Email verification failed. Please try again or register a new account.";
  }

  /**
   * Determines the appropriate redirect destination after verification
   * @param responseData - The response data from the verification API
   * @returns Redirect path or null if no redirect needed
   */
  static getRedirectDestination(responseData: any): string | null {
    // Successful verification should redirect to login
    if (responseData.verified) {
      return responseData.redirectTo || "/login";
    }

    // Expired token should redirect to registration
    if (responseData.expired) {
      return "/register";
    }

    // Other errors don't need automatic redirect
    return null;
  }

  /**
   * Determines verification status based on API response
   * @param response - The fetch response object
   * @param responseData - The parsed response data
   * @returns Status string for UI state management
   */
  static getVerificationStatus(
    response: Response, 
    responseData: any
  ): "loading" | "success" | "error" | "expired" {
    if (response.ok && responseData.verified) {
      return "success";
    }

    if (response.status === 410 || responseData.expired) {
      return "expired";
    }

    return "error";
  }

  /**
   * Sanitizes and validates a token from URL parameters
   * @param rawToken - Raw token from URL search params
   * @returns Cleaned token string or null if invalid
   */
  static sanitizeToken(rawToken: string | null): string | null {
    if (!rawToken) return null;
    
    // Remove any extra whitespace and decode URL encoding
    const cleaned = decodeURIComponent(rawToken.trim());
    
    // Basic sanitization - remove any non-alphanumeric characters except common token chars
    const sanitized = cleaned.replace(/[^a-zA-Z0-9\-_.]/g, '');
    
    return sanitized.length > 0 ? sanitized : null;
  }
}