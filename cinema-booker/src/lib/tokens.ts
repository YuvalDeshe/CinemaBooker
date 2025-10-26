import crypto from 'crypto';

/**
 * Generate a cryptographically secure random token
 * @param length The length of the token in bytes (default: 32)
 * @returns A hex-encoded token string
 */
export function generateSecureToken(length: number = 32): string {
    return crypto.randomBytes(length).toString('hex');
}

/**
 * Generate a verification token with expiration (5 minutes from now)
 * @returns Object containing token and expiration date
 */
export function generateEmailVerificationToken() {
    const token = generateSecureToken();
    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + 5); // Expire in 5 minutes
    
    return {
        token,
        expires
    };
}