import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from '@/app/mongodb';
import User from '@/models/userSchema';
import { generatePasswordResetToken } from '@/lib/tokens';
import { sendEmail, generatePasswordResetEmailHtml, generatePasswordResetEmailText } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { message: 'Email is required' },
        { status: 400 }
      );
    }

    await connectMongoDB();

    console.log('Looking for user with email:', email.toLowerCase());
    
    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });
    
    console.log('User found:', user ? 'Yes' : 'No');
    if (user) {
      console.log('User ID:', user._id);
      console.log('User email:', user.email);
    }

    // Always return success message for security (don't reveal if email exists)
    const successMessage = "If an account with that email exists, we've sent you a password reset link.";

    if (!user) {
      console.log('No user found - returning success message but not sending email');
      return NextResponse.json(
        { message: successMessage },
        { status: 200 }
      );
    }

    // Generate password reset token
    const { token, expires } = generatePasswordResetToken();

    // Save token to user
    user.passwordResetToken = token;
    user.passwordResetExpires = expires;
    await user.save();

    // Create reset URL
    const resetUrl = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/resetPassword/new?token=${token}`;

    // Send reset email
    console.log('Attempting to send reset email to:', email);
    console.log('Reset URL:', resetUrl);
    console.log('SMTP Config Check:', {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      user: process.env.SMTP_USER ? 'Set' : 'Not set',
      password: process.env.SMTP_PASSWORD ? 'Set' : 'Not set',
      from: process.env.SMTP_FROM
    });

    const emailResult = await sendEmail({
      to: email,
      subject: 'Cinema Booker - Reset Your Password',
      html: generatePasswordResetEmailHtml(resetUrl, email),
      text: generatePasswordResetEmailText(resetUrl, email),
    });

    console.log('Email result:', emailResult);

    if (!emailResult.success) {
      console.error('Failed to send reset email:', emailResult.error);
      return NextResponse.json(
        { message: 'Failed to send reset email. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: successMessage },
      { status: 200 }
    );

  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}