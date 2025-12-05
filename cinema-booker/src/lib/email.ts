import nodemailer from 'nodemailer';
import { 
  EmailBuilder, 
  BookingConfirmationEmailBuilder, 
  PromotionalEmailBuilder,
  VerificationEmailBuilder,
  PasswordResetEmailBuilder
} from '@/builders/EmailBuilder';

const transporter = nodemailer.createTransport({
  service: 'gmail', // Use Gmail service
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // Use STARTTLS for port 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false
  }
});

export interface EmailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

export async function sendEmail({ to, subject, text, html }: EmailOptions) {
  try {
    console.log('Preparing to send email...');
    console.log('To:', to);
    console.log('Subject:', subject);
    console.log('From:', process.env.SMTP_FROM || process.env.SMTP_USER);
    console.log('SMTP User:', process.env.SMTP_USER ? 'Set' : 'Not set');
    console.log('SMTP Password:', process.env.SMTP_PASSWORD ? 'Set' : 'Not set');
    
    // Verify transporter connection
    console.log('Verifying SMTP connection...');
    await transporter.verify();
    console.log('SMTP connection verified successfully');
    
    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to,
      subject,
      text,
      html,
    };

    console.log('Sending email with nodemailer...');
    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully! Message ID:', result.messageId);
    console.log('Email details:', {
      accepted: result.accepted,
      rejected: result.rejected,
      pending: result.pending,
      messageId: result.messageId
    });
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      code: (error as any)?.code,
      command: (error as any)?.command,
      stack: error instanceof Error ? error.stack : undefined
    });
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// EMAIL VERIFICATION FUNCTIONS
export function generateVerificationEmailHtml(verificationUrl: string, userEmail: string) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify Your Email - Cinema Booker</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f4f4f4;
            }
            .container {
                background: white;
                border-radius: 10px;
                padding: 30px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .header {
                text-align: center;
                border-bottom: 2px solid #e74c3c;
                padding-bottom: 20px;
                margin-bottom: 30px;
            }
            .logo {
                font-size: 24px;
                font-weight: bold;
                color: #e74c3c;
                margin-bottom: 10px;
            }
            .button {
                display: inline-block;
                padding: 12px 30px;
                background-color: #e74c3c;
                color: white;
                text-decoration: none;
                border-radius: 5px;
                margin: 20px 0;
                font-weight: bold;
            }
            .button:hover {
                background-color: #c0392b;
            }
            .footer {
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #eee;
                font-size: 12px;
                color: #666;
                text-align: center;
            }
            .warning {
                background-color: #fff3cd;
                border: 1px solid #ffeaa7;
                color: #856404;
                padding: 15px;
                border-radius: 5px;
                margin: 20px 0;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">Cinema Booker</div>
                <h1>Welcome to Cinema Booker!</h1>
            </div>
            
            <p>Hi there!</p>
            
            <p>Thank you for registering with Cinema Booker! To complete your registration and activate your account, please verify your email address by clicking the button below:</p>
            
            <div style="text-align: center;">
                <a href="${verificationUrl}" class="button">Verify My Email</a>
            </div>
            
            <p>Or copy and paste this link into your browser:</p>
            <p style="word-break: break-all; background-color: #f8f9fa; padding: 10px; border-radius: 5px;">
                ${verificationUrl}
            </p>
            
            <div class="warning">
                <strong>Important:</strong> This verification link will expire in 5 minutes. If you don't verify your email within this time, you'll need to register again.
            </div>
            
            <p>Once you verify your email, you'll be able to:</p>
            <ul>
                <li>Browse and book movie tickets</li>
                <li>Receive promotional offers</li>
                <li>Manage your account settings</li>
            </ul>
            
            <p>If you didn't create an account with Cinema Booker, please ignore this email.</p>
            
            <div class="footer">
                <p>This email was sent to ${userEmail}</p>
                <p>Cinema Booker &copy; 2025. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
  `;
}

// PROFILE UPDATE FUNCTIONS
export function generateProfileUpdateEmailHtml(userName: string, updatedFields: string[]) {
  const fieldsText = updatedFields.map(field => {
    // Convert camelCase to readable format
    const readable = field.replace(/([A-Z])/g, ' $1').toLowerCase();
    return readable.charAt(0).toUpperCase() + readable.slice(1);
  }).join(', ');

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Profile Updated - Cinema Booker</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f4f4f4;
            }
            .container {
                background: white;
                border-radius: 10px;
                padding: 30px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .header {
                text-align: center;
                border-bottom: 2px solid #e74c3c;
                padding-bottom: 20px;
                margin-bottom: 30px;
            }
            .logo {
                font-size: 24px;
                font-weight: bold;
                color: #e74c3c;
                margin-bottom: 10px;
            }
            .success-icon {
                font-size: 48px;
                color: #27ae60;
                margin: 20px 0;
            }
            .field-list {
                background-color: #f8f9fa;
                padding: 15px;
                border-radius: 5px;
                margin: 20px 0;
                border-left: 4px solid #e74c3c;
            }
            .footer {
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #eee;
                font-size: 12px;
                color: #666;
                text-align: center;
            }
            .security-note {
                background-color: #fff3cd;
                border: 1px solid #ffeaa7;
                color: #856404;
                padding: 15px;
                border-radius: 5px;
                margin: 20px 0;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">Cinema Booker</div>
                <h1>Profile Updated Successfully</h1>
            </div>
            
            <p>Hi ${userName},</p>
            
            <p>Your Cinema Booker profile has been updated successfully. The following information was modified:</p>
            
            <div class="field-list">
                <strong>Updated Fields:</strong> ${fieldsText}
            </div>
            
            <p>These changes were made on ${new Date().toLocaleString()}.</p>
            
            <div class="security-note">
                <strong>Security Notice:</strong> If you did not make these changes, please contact our support team immediately and consider changing your password.
            </div>
            
            <p>Thank you for using Cinema Booker!</p>
            
            <div class="footer">
                <p>Cinema Booker &copy; 2025. All rights reserved.</p>
                <p>This is an automated message, please do not reply to this email.</p>
            </div>
        </div>
    </body>
    </html>
  `;
}

export function generateVerificationEmailText(verificationUrl: string, userEmail: string) {
  return `
Welcome to Cinema Booker!

Thank you for registering with Cinema Booker! To complete your registration and activate your account, please verify your email address by visiting the following link:

${verificationUrl}

This verification link will expire in 5 minutes. If you don't verify your email within this time, you'll need to register again.

Once you verify your email, you'll be able to:
- Browse and book movie tickets
- Receive promotional offers
- Manage your account settings

If you didn't create an account with Cinema Booker, please ignore this email.

This email was sent to ${userEmail}
Cinema Booker © 2025. All rights reserved.
  `;
}

export function generateProfileUpdateEmailText(userName: string, updatedFields: string[]) {
  const fieldsText = updatedFields.map(field => {
    // Convert camelCase to readable format
    const readable = field.replace(/([A-Z])/g, ' $1').toLowerCase();
    return readable.charAt(0).toUpperCase() + readable.slice(1);
  }).join(', ');

  return `
Cinema Booker - Profile Updated

Hi ${userName},

Your Cinema Booker profile has been updated successfully.

Updated Fields: ${fieldsText}

These changes were made on ${new Date().toLocaleString()}.

SECURITY NOTICE: If you did not make these changes, please contact our support team immediately and consider changing your password.

Thank you for using Cinema Booker!

Cinema Booker © 2025. All rights reserved.
This is an automated message, please do not reply to this email.
  `;
}

// PASSWORD RESET FUNCTIONS
export function generatePasswordResetEmailHtml(resetUrl: string, userEmail: string) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset Your Password - Cinema Booker</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f4f4f4;
            }
            .container {
                background: white;
                border-radius: 10px;
                padding: 30px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .header {
                text-align: center;
                border-bottom: 2px solid #e74c3c;
                padding-bottom: 20px;
                margin-bottom: 30px;
            }
            .logo {
                font-size: 24px;
                font-weight: bold;
                color: #e74c3c;
                margin-bottom: 10px;
            }
            .button {
                display: inline-block;
                padding: 12px 30px;
                background-color: #e74c3c;
                color: white;
                text-decoration: none;
                border-radius: 5px;
                margin: 20px 0;
                font-weight: bold;
            }
            .button:hover {
                background-color: #c0392b;
            }
            .footer {
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #eee;
                font-size: 12px;
                color: #666;
                text-align: center;
            }
            .warning {
                background-color: #fff3cd;
                border: 1px solid #ffeaa7;
                color: #856404;
                padding: 15px;
                border-radius: 5px;
                margin: 20px 0;
            }
            .security-notice {
                background-color: #f8d7da;
                border: 1px solid #f5c6cb;
                color: #721c24;
                padding: 15px;
                border-radius: 5px;
                margin: 20px 0;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">Cinema Booker</div>
                <h1>Password Reset Request</h1>
            </div>
            
            <p>Hi there!</p>
            
            <p>We received a request to reset the password for your Cinema Booker account. If you made this request, click the button below to reset your password:</p>
            
            <div style="text-align: center;">
                <a href="${resetUrl}" class="button">Reset My Password</a>
            </div>
            
            <p>Or copy and paste this link into your browser:</p>
            <p style="word-break: break-all; background-color: #f8f9fa; padding: 10px; border-radius: 5px;">
                ${resetUrl}
            </p>
            
            <div class="warning">
                <strong>Important:</strong> This password reset link will expire in 15 minutes. If you don't reset your password within this time, you'll need to request a new reset link.
            </div>
            
            <div class="security-notice">
                <strong>Security Notice:</strong> If you did not request a password reset, please ignore this email. Your password will remain unchanged. If you're concerned about the security of your account, please contact our support team.
            </div>
            
            <p>For your security, this reset link can only be used once. After you create a new password, this link will no longer work.</p>
            
            <div class="footer">
                <p>This email was sent to ${userEmail}</p>
                <p>Cinema Booker &copy; 2025. All rights reserved.</p>
                <p>This is an automated message, please do not reply to this email.</p>
            </div>
        </div>
    </body>
    </html>
  `;
}

export function generatePasswordResetEmailText(resetUrl: string, userEmail: string) {
  return `
Cinema Booker - Password Reset Request

Hi there!

We received a request to reset the password for your Cinema Booker account. If you made this request, visit the following link to reset your password:

${resetUrl}

This password reset link will expire in 15 minutes. If you don't reset your password within this time, you'll need to request a new reset link.

SECURITY NOTICE: If you did not request a password reset, please ignore this email. Your password will remain unchanged. If you're concerned about the security of your account, please contact our support team.

For your security, this reset link can only be used once. After you create a new password, this link will no longer work.

This email was sent to ${userEmail}
Cinema Booker © 2025. All rights reserved.
This is an automated message, please do not reply to this email.
  `;
}

// PROMOTIONAL EMAIL FUNCTIONS
export function generatePromotionalEmailHtml(
  userName: string, 
  promoCode: string, 
  discountPercent: number,
  startDate: string,
  endDate: string
) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Exclusive Discount - Cinema Booker</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f4f4f4;
            }
            .container {
                background: white;
                border-radius: 10px;
                padding: 30px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .header {
                text-align: center;
                border-bottom: 2px solid #e74c3c;
                padding-bottom: 20px;
                margin-bottom: 30px;
            }
            .logo {
                font-size: 24px;
                font-weight: bold;
                color: #e74c3c;
                margin-bottom: 10px;
            }
            .promo-banner {
                background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
                color: white;
                padding: 30px;
                border-radius: 10px;
                text-align: center;
                margin: 30px 0;
                box-shadow: 0 4px 15px rgba(231, 76, 60, 0.3);
            }
            .discount-amount {
                font-size: 48px;
                font-weight: bold;
                margin: 10px 0;
            }
            .promo-code {
                background: white;
                color: #e74c3c;
                padding: 15px 30px;
                border-radius: 8px;
                font-size: 28px;
                font-weight: bold;
                letter-spacing: 3px;
                margin: 20px 0;
                display: inline-block;
                border: 3px dashed #e74c3c;
            }
            .button {
                display: inline-block;
                padding: 15px 40px;
                background-color: #e74c3c;
                color: white;
                text-decoration: none;
                border-radius: 5px;
                margin: 20px 0;
                font-weight: bold;
                font-size: 16px;
            }
            .button:hover {
                background-color: #c0392b;
            }
            .date-info {
                background-color: #fff3cd;
                border: 1px solid #ffeaa7;
                color: #856404;
                padding: 15px;
                border-radius: 5px;
                margin: 20px 0;
                text-align: center;
            }
            .features {
                margin: 20px 0;
            }
            .features ul {
                list-style: none;
                padding: 0;
            }
            .features li {
                padding: 10px 0;
                border-bottom: 1px solid #eee;
            }
            .features li:before {
                content: "• ";
                margin-right: 10px;
            }
            .footer {
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #eee;
                font-size: 12px;
                color: #666;
                text-align: center;
            }
            .unsubscribe {
                color: #999;
                font-size: 11px;
                margin-top: 10px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">Cinema Booker</div>
                <h1>Exclusive Discount Just For You!</h1>
            </div>
            
            <p>Hi ${userName}!</p>
            
            <p>Great news! As a valued Cinema Booker member, you've been selected to receive an exclusive discount on your next movie booking.</p>
            
            <div class="promo-banner">
                <div style="font-size: 20px; margin-bottom: 10px;">Save Big on Your Next Movie!</div>
                <div class="discount-amount">${discountPercent}% OFF</div>
                <div style="font-size: 18px; margin-top: 10px;">Use promo code:</div>
                <div class="promo-code">${promoCode}</div>
            </div>
            
            <div class="date-info">
                <strong>Limited Time Offer!</strong><br>
                Valid from ${new Date(startDate).toLocaleDateString()} to ${new Date(endDate).toLocaleDateString()}
            </div>
            
            <div style="text-align: center;">
                <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}" class="button">Book Your Tickets Now</a>
            </div>
            
            <div class="features">
                <h3>How to Use Your Discount:</h3>
                <ul>
                    <li>Browse our latest movies and select your showtime</li>
                    <li>Choose your seats and proceed to checkout</li>
                    <li>Enter promo code <strong>${promoCode}</strong> at checkout</li>
                    <li>Enjoy ${discountPercent}% off your ticket price!</li>
                </ul>
            </div>
            
            <p style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; border-left: 4px solid #e74c3c;">
                <strong>Pro Tip:</strong> This discount can be used multiple times during the promotion period, so invite your friends and family for the ultimate cinema experience!
            </p>
            
            <p>Don't miss out on this amazing offer! Book your tickets today and enjoy the magic of cinema at a discounted price.</p>
            
            <div class="footer">
                <p>Thank you for being a valued Cinema Booker member!</p>
                <p>Cinema Booker &copy; 2025. All rights reserved.</p>
                <div class="unsubscribe">
                    <p>You're receiving this email because you opted in to receive promotional offers.</p>
                    <p>To manage your email preferences, visit your account settings.</p>
                </div>
            </div>
        </div>
    </body>
    </html>
  `;
}

export function generatePromotionalEmailText(
  userName: string, 
  promoCode: string, 
  discountPercent: number,
  startDate: string,
  endDate: string
) {
  return `
Cinema Booker - Exclusive Discount Just For You!

Hi ${userName}!

Great news! As a valued Cinema Booker member, you've been selected to receive an exclusive discount on your next movie booking.

*** SPECIAL OFFER ***
${discountPercent}% OFF YOUR NEXT BOOKING!

USE PROMO CODE: ${promoCode}

VALID FROM: ${new Date(startDate).toLocaleDateString()}
VALID UNTIL: ${new Date(endDate).toLocaleDateString()}

HOW TO USE YOUR DISCOUNT:
1. Browse our latest movies and select your showtime
2. Choose your seats and proceed to checkout
3. Enter promo code ${promoCode} at checkout
4. Enjoy ${discountPercent}% off your ticket price!

PRO TIP: This discount can be used multiple times during the promotion period, so invite your friends and family for the ultimate cinema experience!

Book your tickets now at: ${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}

Don't miss out on this amazing offer!

Thank you for being a valued Cinema Booker member!

Cinema Booker © 2025. All rights reserved.

---
You're receiving this email because you opted in to receive promotional offers.
To manage your email preferences, visit your account settings.
  `;
}

// BOOKING CONFIRMATION EMAIL FUNCTIONS
export function generateBookingConfirmationEmailHtml(
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
  }
) {
  const { bookingId, movieTitle, showtime, date, auditorium, seats, adultTickets, childTickets, seniorTickets, orderTotal, promoCode, bookingDate } = bookingDetails;
  const totalTickets = adultTickets + childTickets + seniorTickets;

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Booking Confirmation - Cinema Booker</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f4f4f4;
            }
            .container {
                background: white;
                border-radius: 10px;
                padding: 30px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .header {
                text-align: center;
                border-bottom: 2px solid #10b981;
                padding-bottom: 20px;
                margin-bottom: 30px;
            }
            .logo {
                font-size: 24px;
                font-weight: bold;
                color: #e74c3c;
                margin-bottom: 10px;
            }
            .success-icon {
                font-size: 64px;
                margin: 10px 0;
            }
            .booking-id {
                background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                color: white;
                padding: 20px;
                border-radius: 10px;
                text-align: center;
                margin: 20px 0;
                box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
            }
            .booking-id-label {
                font-size: 12px;
                opacity: 0.9;
                margin-bottom: 8px;
            }
            .booking-id-value {
                font-size: 24px;
                font-weight: bold;
                font-family: monospace;
                letter-spacing: 2px;
            }
            .details-section {
                margin: 25px 0;
                padding: 20px;
                background-color: #f8f9fa;
                border-radius: 8px;
                border-left: 4px solid #10b981;
            }
            .details-section h3 {
                margin-top: 0;
                color: #059669;
                font-size: 18px;
            }
            .detail-row {
                display: flex;
                justify-content: space-between;
                padding: 8px 0;
                border-bottom: 1px solid #e5e7eb;
            }
            .detail-row:last-child {
                border-bottom: none;
            }
            .detail-label {
                color: #6b7280;
                font-weight: 500;
            }
            .detail-value {
                font-weight: 600;
                color: #1f2937;
            }
            .seats-container {
                display: flex;
                flex-wrap: wrap;
                gap: 8px;
                margin-top: 12px;
            }
            .seat-badge {
                background-color: #10b981;
                color: white;
                padding: 6px 12px;
                border-radius: 6px;
                font-weight: 600;
                font-size: 14px;
            }
            .total-section {
                background-color: #f0fdf4;
                border: 2px solid #10b981;
                padding: 20px;
                border-radius: 8px;
                margin: 25px 0;
            }
            .total-amount {
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 24px;
                font-weight: bold;
                color: #059669;
            }
            .promo-badge {
                background-color: #fef3c7;
                color: #92400e;
                padding: 8px 16px;
                border-radius: 6px;
                display: inline-block;
                margin: 10px 0;
                font-weight: 600;
            }
            .important-info {
                background-color: #fff7ed;
                border: 1px solid #fed7aa;
                color: #9a3412;
                padding: 20px;
                border-radius: 8px;
                margin: 25px 0;
            }
            .important-info h4 {
                margin-top: 0;
                color: #9a3412;
            }
            .important-info ul {
                margin-bottom: 0;
                padding-left: 20px;
            }
            .important-info li {
                margin: 8px 0;
            }
            .footer {
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #eee;
                font-size: 12px;
                color: #666;
                text-align: center;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">Cinema Booker</div>
                <h1 style="margin: 0; color: #10b981;">Booking Confirmed!</h1>
                <p style="margin: 8px 0 0 0; color: #6b7280;">Your tickets are ready</p>
            </div>
            
            <p>Hi ${userName}!</p>
            
            <p>Great news! Your movie tickets have been successfully booked. We're excited to see you at the cinema!</p>
            
            <div class="booking-id">
                <div class="booking-id-label">YOUR BOOKING ID</div>
                <div class="booking-id-value">${bookingId}</div>
            </div>
            
            <div class="details-section">
                <h3>Movie Information</h3>
                <div class="detail-row">
                    <span class="detail-label">Movie:</span>
                    <span class="detail-value">${movieTitle}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Date:</span>
                    <span class="detail-value">${date}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Showtime:</span>
                    <span class="detail-value">${showtime}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Auditorium:</span>
                    <span class="detail-value">${auditorium}</span>
                </div>
            </div>
            
            <div class="details-section">
                <h3>Ticket Information</h3>
                ${adultTickets > 0 ? `
                <div class="detail-row">
                    <span class="detail-label">Adult Tickets:</span>
                    <span class="detail-value">${adultTickets}</span>
                </div>` : ''}
                ${childTickets > 0 ? `
                <div class="detail-row">
                    <span class="detail-label">Child Tickets:</span>
                    <span class="detail-value">${childTickets}</span>
                </div>` : ''}
                ${seniorTickets > 0 ? `
                <div class="detail-row">
                    <span class="detail-label">Senior Tickets:</span>
                    <span class="detail-value">${seniorTickets}</span>
                </div>` : ''}
                <div class="detail-row" style="border-top: 2px solid #d1d5db; margin-top: 8px; padding-top: 12px;">
                    <span class="detail-label">Total Tickets:</span>
                    <span class="detail-value">${totalTickets}</span>
                </div>
            </div>
            
            <div class="details-section">
                <h3>Your Seats</h3>
                <div class="seats-container">
                    ${seats.map(seat => `<span class="seat-badge">${seat}</span>`).join('')}
                </div>
            </div>
            
            <div class="total-section">
                ${promoCode ? `<div class="promo-badge">Promo Code Applied: ${promoCode}</div>` : ''}
                <div class="total-amount">
                    <span>Total Paid:</span>
                    <span>$${orderTotal.toFixed(2)}</span>
                </div>
            </div>
            
            <p style="text-align: center; margin: 30px 0;">
                <strong>Need to make changes?</strong><br>
                Contact our support team or visit your account dashboard.
            </p>
            
            <p>Thank you for choosing Cinema Booker. Enjoy the show!</p>
            
            <div class="footer">
                <p>Booking made on ${new Date(bookingDate).toLocaleString()}</p>
                <p>Cinema Booker &copy; 2025. All rights reserved.</p>
                <p>This is an automated confirmation email.</p>
            </div>
        </div>
    </body>
    </html>
  `;
}

export function generateBookingConfirmationEmailText(
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
  }
) {
  const { bookingId, movieTitle, showtime, date, auditorium, seats, adultTickets, childTickets, seniorTickets, orderTotal, promoCode, bookingDate } = bookingDetails;
  const totalTickets = adultTickets + childTickets + seniorTickets;

  return `
Cinema Booker - Booking Confirmation

Hi ${userName}!

Great news! Your movie tickets have been successfully booked. We're excited to see you at the cinema!

========================================
YOUR BOOKING ID: ${bookingId}
========================================

MOVIE INFORMATION:
------------------
Movie: ${movieTitle}
Date: ${date}
Showtime: ${showtime}
Auditorium: ${auditorium}

TICKET INFORMATION:
-------------------
${adultTickets > 0 ? `Adult Tickets: ${adultTickets}\n` : ''}${childTickets > 0 ? `Child Tickets: ${childTickets}\n` : ''}${seniorTickets > 0 ? `Senior Tickets: ${seniorTickets}\n` : ''}Total Tickets: ${totalTickets}

YOUR SEATS:
-----------
${seats.join(', ')}

PAYMENT SUMMARY:
----------------
${promoCode ? `Promo Code Applied: ${promoCode}\n` : ''}Total Paid: $${orderTotal.toFixed(2)}

Need to make changes?
Contact our support team or visit your account dashboard.

Thank you for choosing Cinema Booker. Enjoy the show!

Booking made on ${new Date(bookingDate).toLocaleString()}
Cinema Booker © 2025. All rights reserved.
This is an automated confirmation email.
  `;
}

// ====================================================================
// BUILDER PATTERN HELPER FUNCTIONS
// ====================================================================
// These functions demonstrate the Builder Design Pattern for email creation
// They provide a clean, fluent interface for constructing complex email objects

/**
 * Creates a booking confirmation email using the Builder pattern
 * 
 * Example usage:
 * const email = buildBookingConfirmationEmail(userEmail, userName, bookingDetails);
 * await sendEmail(email);
 */
export function buildBookingConfirmationEmail(
  userEmail: string,
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
  }
) {
  return new BookingConfirmationEmailBuilder()
    .setRecipient(userEmail)
    .setBookingDetails(
      userName,
      bookingDetails,
      generateBookingConfirmationEmailHtml,
      generateBookingConfirmationEmailText
    )
    .build();
}

/**
 * Creates a promotional email using the Builder pattern
 * 
 * Example usage:
 * const email = buildPromotionalEmail(userEmail, userName, promoCode, discount, startDate, endDate);
 * await sendEmail(email);
 */
export function buildPromotionalEmail(
  userEmail: string,
  userName: string,
  promoCode: string,
  discountPercent: number,
  startDate: string,
  endDate: string
) {
  return new PromotionalEmailBuilder()
    .setRecipient(userEmail)
    .setPromoDetails(
      userName,
      promoCode,
      discountPercent,
      startDate,
      endDate,
      generatePromotionalEmailHtml,
      generatePromotionalEmailText
    )
    .build();
}

/**
 * Creates a verification email using the Builder pattern
 * 
 * Example usage:
 * const email = buildVerificationEmail(userEmail, verificationUrl);
 * await sendEmail(email);
 */
export function buildVerificationEmail(
  userEmail: string,
  verificationUrl: string
) {
  return new VerificationEmailBuilder()
    .setRecipient(userEmail)
    .setVerificationDetails(
      userEmail,
      verificationUrl,
      generateVerificationEmailHtml,
      generateVerificationEmailText
    )
    .build();
}

/**
 * Creates a password reset email using the Builder pattern
 * 
 * Example usage:
 * const email = buildPasswordResetEmail(userEmail, resetUrl);
 * await sendEmail(email);
 */
export function buildPasswordResetEmail(
  userEmail: string,
  resetUrl: string
) {
  return new PasswordResetEmailBuilder()
    .setRecipient(userEmail)
    .setResetDetails(
      userEmail,
      resetUrl,
      generatePasswordResetEmailHtml,
      generatePasswordResetEmailText
    )
    .build();
}

/**
 * Creates a profile update notification email using the Builder pattern
 * 
 * Example usage:
 * const email = buildProfileUpdateEmail(userEmail, userName, ['email', 'password']);
 * await sendEmail(email);
 */
export function buildProfileUpdateEmail(
  userEmail: string,
  userName: string,
  updatedFields: string[]
) {
  const html = generateProfileUpdateEmailHtml(userName, updatedFields);
  const text = generateProfileUpdateEmailText(userName, updatedFields);
  
  return new EmailBuilder()
    .setRecipient(userEmail)
    .setSubject('Profile Updated - Cinema Booker')
    .setType('profile-update')
    .setContent(text, html)
    .build();
}