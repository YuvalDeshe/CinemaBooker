import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export interface EmailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

export async function sendEmail({ to, subject, text, html }: EmailOptions) {
  try {
    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to,
      subject,
      text,
      html,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

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
                <div class="success-icon">✅</div>
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