/**
 * Builder Pattern Exports
 * 
 * Central export point for all builder classes implementing the Builder Design Pattern.
 * This makes it easy to import builders throughout the application.
 */

// Booking Builder
export { BookingBuilder } from './BookingBuilder';
export type { BookingData } from './BookingBuilder';

// Email Builders
export {
    EmailBuilder,
    BookingConfirmationEmailBuilder,
    PromotionalEmailBuilder,
    VerificationEmailBuilder,
    PasswordResetEmailBuilder
} from './EmailBuilder';

export type {
    EmailContent,
    EmailMetadata
} from './EmailBuilder';
