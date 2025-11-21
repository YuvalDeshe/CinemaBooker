import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import { generatePasswordResetToken } from '@/lib/tokens';
import {
  sendEmail,
  generatePasswordResetEmailHtml,
  generatePasswordResetEmailText,
} from '@/lib/email';

const uri = process.env.MONGODB_URI ?? '';
const client = new MongoClient(uri);
const dbName = 'UserDatabase';

async function connectToDatabase() {
  if (!client.topology?.isConnected()) {
    await client.connect();
  }
  const db = client.db(dbName);
  return db;
}

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ message: 'Email is required' }, { status: 400 });
    }

    const db = await connectToDatabase();
    const usersCollection = db.collection('UserCollection');

    const user = await usersCollection.findOne({ email: email.toLowerCase() });

    const successMessage =
      "If an account with that email exists, we've sent you a password reset link.";

    if (!user) {
      console.log('No user found, returning success message (security measure)');
      return NextResponse.json({ message: successMessage }, { status: 200 });
    }

    // Generate reset token
    const { token, expires } = generatePasswordResetToken();

    // Save token fields
    await usersCollection.updateOne(
      { _id: user._id },
      {
        $set: {
          passwordResetToken: token,
          passwordResetExpires: expires,
        },
      }
    );

    // Build reset URL
    const resetUrl = `${
      process.env.NEXTAUTH_URL || 'http://localhost:3000'
    }/resetPassword/new?token=${token}`;

    console.log('Sending password reset email to:', email);
    console.log('Reset URL:', resetUrl);

    const emailResult = await sendEmail({
      to: email,
      subject: 'Cinema Booker - Reset Your Password',
      html: generatePasswordResetEmailHtml(resetUrl, email),
      text: generatePasswordResetEmailText(resetUrl, email),
    });

    if (!emailResult.success) {
      console.error('Failed to send reset email:', emailResult.error);
      return NextResponse.json(
        { message: 'Failed to send reset email. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: successMessage }, { status: 200 });
  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json(
      { message: 'Internal server error', error: error.message },
      { status: 500 }
    );
  }
}
