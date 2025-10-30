import crypto from 'crypto';
import { ISODateString } from 'next-auth';

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

/**Generate a password reset token with expiration (15 minutes from now)
 * @returns Object containing token and expiration date
 */
export function generatePasswordResetToken() {
    const token = generateSecureToken();
    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + 15); // Expire in 15 minutes
    
    return {
        token,
        expires
    };
}

/**Check if a token has expired
 * @param expiresAt The expiration date of the token
 * @returns True if the token has expired, false otherwise
 */
export function isTokenExpired(expiresAt: ISODateString): boolean {
    return new Date() > expiresAt;
}