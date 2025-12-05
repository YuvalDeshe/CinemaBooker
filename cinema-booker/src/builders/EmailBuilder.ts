/**
 * EmailBuilder - Implements the Builder Design Pattern for Email Construction
 * 
 * Purpose: Provides a fluent interface for building email objects with various
 * configurations. This pattern helps maintain consistency across different email
 * types while allowing flexibility in content and styling.
 * 
 * Benefits:
 * - Simplifies email object creation
 * - Ensures all required fields are present
 * - Provides type safety for email construction
 * - Makes it easy to create different email templates
 */

export interface EmailContent {
    to: string;
    subject: string;
    text?: string;
    html?: string;
}

export interface EmailMetadata {
    type?: 'verification' | 'reset-password' | 'booking-confirmation' | 'promotional' | 'profile-update';
    priority?: 'high' | 'normal' | 'low';
    replyTo?: string;
    cc?: string[];
    bcc?: string[];
}

export class EmailBuilder {
    private email: Partial<EmailContent & EmailMetadata>;

    constructor() {
        this.email = {
            priority: 'normal'
        };
    }

    /**
     * Sets the recipient email address
     */
    setRecipient(to: string): this {
        this.email.to = to;
        return this;
    }

    /**
     * Sets multiple recipients
     */
    setRecipients(recipients: string[]): this {
        this.email.to = recipients.join(', ');
        return this;
    }

    /**
     * Sets the email subject
     */
    setSubject(subject: string): this {
        this.email.subject = subject;
        return this;
    }

    /**
     * Sets the plain text content
     */
    setText(text: string): this {
        this.email.text = text;
        return this;
    }

    /**
     * Sets the HTML content
     */
    setHtml(html: string): this {
        this.email.html = html;
        return this;
    }

    /**
     * Sets both text and HTML content
     */
    setContent(text: string, html: string): this {
        this.email.text = text;
        this.email.html = html;
        return this;
    }

    /**
     * Sets the email type for classification
     */
    setType(type: EmailMetadata['type']): this {
        this.email.type = type;
        return this;
    }

    /**
     * Sets the priority level
     */
    setPriority(priority: EmailMetadata['priority']): this {
        this.email.priority = priority;
        return this;
    }

    /**
     * Sets the reply-to address
     */
    setReplyTo(replyTo: string): this {
        this.email.replyTo = replyTo;
        return this;
    }

    /**
     * Adds CC recipients
     */
    addCc(emails: string[]): this {
        this.email.cc = emails;
        return this;
    }

    /**
     * Adds BCC recipients
     */
    addBcc(emails: string[]): this {
        this.email.bcc = emails;
        return this;
    }

    /**
     * Validates that all required fields are set
     */
    private validate(): void {
        if (!this.email.to) {
            throw new Error('Email recipient (to) is required');
        }
        if (!this.email.subject) {
            throw new Error('Email subject is required');
        }
        if (!this.email.text && !this.email.html) {
            throw new Error('Email must have either text or HTML content');
        }
    }

    /**
     * Builds and returns the final email object
     */
    build(): EmailContent {
        this.validate();
        return {
            to: this.email.to!,
            subject: this.email.subject!,
            text: this.email.text,
            html: this.email.html
        };
    }

    /**
     * Builds with metadata included (for internal tracking)
     */
    buildWithMetadata(): EmailContent & EmailMetadata {
        this.validate();
        return this.email as EmailContent & EmailMetadata;
    }

    /**
     * Resets the builder to create a new email
     */
    reset(): this {
        this.email = {
            priority: 'normal'
        };
        return this;
    }

    /**
     * Creates a clone of the current email state
     */
    clone(): this {
        const constructor = this.constructor as new () => this;
        const newBuilder = new constructor();
        (newBuilder as any).email = { ...(this as any).email };
        return newBuilder;
    }
}

/**
 * Specialized builder for booking confirmation emails
 */
export class BookingConfirmationEmailBuilder extends EmailBuilder {
    constructor() {
        super();
        this.setType('booking-confirmation');
        this.setSubject('Booking Confirmation - Cinema Booker');
    }

    /**
     * Sets booking-specific content using template generators
     */
    setBookingDetails(
        userName: string,
        bookingDetails: {
            bookingId: string;
            movieTitle: string;
            showtime: string;
            date: string;
            auditorium: string;
            seats: string[];
            adultTickets: number;
            childTickets: number;
            seniorTickets: number;
            orderTotal: number;
            promoCode?: string;
            bookingDate: string;
        },
        generateHtml: (name: string, details: any) => string,
        generateText: (name: string, details: any) => string
    ): BookingConfirmationEmailBuilder {
        const html = generateHtml(userName, bookingDetails);
        const text = generateText(userName, bookingDetails);
        this.setContent(text, html);
        this.setSubject(`Booking Confirmation - ${bookingDetails.movieTitle}`);
        return this;
    }
}

/**
 * Specialized builder for promotional emails
 */
export class PromotionalEmailBuilder extends EmailBuilder {
    constructor() {
        super();
        this.setType('promotional');
    }

    /**
     * Sets promotional email content
     */
    setPromoDetails(
        userName: string,
        promoCode: string,
        discountPercent: number,
        startDate: string,
        endDate: string,
        generateHtml: (name: string, code: string, percent: number, start: string, end: string) => string,
        generateText: (name: string, code: string, percent: number, start: string, end: string) => string
    ): PromotionalEmailBuilder {
        const html = generateHtml(userName, promoCode, discountPercent, startDate, endDate);
        const text = generateText(userName, promoCode, discountPercent, startDate, endDate);
        this.setContent(text, html);
        this.setSubject(`Exclusive ${discountPercent}% Discount - Cinema Booker`);
        return this;
    }
}

/**
 * Specialized builder for verification emails
 */
export class VerificationEmailBuilder extends EmailBuilder {
    constructor() {
        super();
        this.setType('verification');
        this.setSubject('Verify Your Email - Cinema Booker');
        this.setPriority('high');
    }

    /**
     * Sets verification-specific content
     */
    setVerificationDetails(
        userEmail: string,
        verificationUrl: string,
        generateHtml: (url: string, email: string) => string,
        generateText: (url: string, email: string) => string
    ): VerificationEmailBuilder {
        const html = generateHtml(verificationUrl, userEmail);
        const text = generateText(verificationUrl, userEmail);
        this.setContent(text, html);
        return this;
    }
}

/**
 * Specialized builder for password reset emails
 */
export class PasswordResetEmailBuilder extends EmailBuilder {
    constructor() {
        super();
        this.setType('reset-password');
        this.setSubject('Password Reset Request - Cinema Booker');
        this.setPriority('high');
    }

    /**
     * Sets password reset content
     */
    setResetDetails(
        userEmail: string,
        resetUrl: string,
        generateHtml: (url: string, email: string) => string,
        generateText: (url: string, email: string) => string
    ): PasswordResetEmailBuilder {
        const html = generateHtml(resetUrl, userEmail);
        const text = generateText(resetUrl, userEmail);
        this.setContent(text, html);
        return this;
    }
}
