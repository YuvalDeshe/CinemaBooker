import { MongoClient } from 'mongodb';
import { NextRequest } from 'next/server';
import { generateEmailVerificationToken } from '@/lib/tokens';
import { sendEmail, generateVerificationEmailHtml, generateVerificationEmailText } from '@/lib/email';

const uri = process.env.MONGODB_URI;

let client: MongoClient;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let db: any;

async function connectToDatabase() {
    if (db) {
        return { db };
    }

    client = new MongoClient(uri!);
    await client.connect();
    db = client.db('UserDatabase');

    return { db };
}

export async function POST(request: NextRequest) {
    try {
        const { email } = await request.json();

        if (!email) {
            return new Response(
                JSON.stringify({ message: "Email address is required." }),
                {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        }

        const { db } = await connectToDatabase();
        const usersCollection = db.collection('UserCollection');

        // Find user by email
        const user = await usersCollection.findOne({ email: email });

        if (!user) {
            return new Response(
                JSON.stringify({ message: "User not found." }),
                {
                    status: 404,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        }

        // Check if already verified
        if (user.isEmailVerified) {
            return new Response(
                JSON.stringify({ message: "Email is already verified." }),
                {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        }

        // Generate new verification token
        const { token: emailVerificationToken, expires: emailVerificationExpires } = generateEmailVerificationToken();

        // Update user with new token
        await usersCollection.updateOne(
            { _id: user._id },
            {
                $set: {
                    emailVerificationToken: emailVerificationToken,
                    emailVerificationExpires: emailVerificationExpires,
                }
            }
        );

        // Send verification email
        const verificationUrl = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/verify-email?token=${emailVerificationToken}`;
        
        try {
            const emailResult = await sendEmail({
                to: user.email,
                subject: 'Verify Your Email - Cinema Booker',
                text: generateVerificationEmailText(verificationUrl, user.email),
                html: generateVerificationEmailHtml(verificationUrl, user.email),
            });

            if (!emailResult.success) {
                console.error('Failed to send verification email:', emailResult.error);
                return new Response(
                    JSON.stringify({ 
                        message: "Failed to send verification email. Please try again later.",
                        error: emailResult.error
                    }),
                    {
                        status: 500,
                        headers: { 'Content-Type': 'application/json' },
                    }
                );
            }

            return new Response(
                JSON.stringify({ 
                    message: "Verification email sent successfully. Please check your inbox.",
                    sent: true
                }),
                {
                    status: 200,
                    headers: { 'Content-Type': 'application/json' },
                }
            );

        } catch (emailError) {
            console.error('Error sending verification email:', emailError);
            return new Response(
                JSON.stringify({ 
                    message: "An error occurred while sending the verification email.",
                    error: emailError instanceof Error ? emailError.message : 'Unknown error'
                }),
                {
                    status: 500,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        }

    } catch (error) {
        console.error("Error resending verification email:", error);
        return new Response(
            JSON.stringify({ 
                message: "An error occurred while processing the request.", 
                error: error instanceof Error ? error.message : 'Unknown error'
            }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }
}