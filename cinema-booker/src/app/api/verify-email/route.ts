import { MongoClient } from 'mongodb';
import { NextRequest } from 'next/server';

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

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const token = searchParams.get('token');

        if (!token) {
            return new Response(
                JSON.stringify({ message: "Verification token is required." }),
                {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        }

        const { db } = await connectToDatabase();
        const usersCollection = db.collection('UserCollection');

        // Find user with matching verification token that hasn't expired
        const user = await usersCollection.findOne({
            emailVerificationToken: token,
            emailVerificationExpires: { $gt: new Date() }
        });

        if (!user) {
            return new Response(
                JSON.stringify({ 
                    message: "Invalid or expired verification token. Please register again." 
                }),
                {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        }

        // Update user to be verified and remove verification token
        await usersCollection.updateOne(
            { _id: user._id },
            {
                $set: {
                    isEmailVerified: true,
                    userStatus: "Active" // Activate the user
                },
                $unset: {
                    emailVerificationToken: "",
                    emailVerificationExpires: ""
                }
            }
        );

        // Return success response with redirect information
        return new Response(
            JSON.stringify({ 
                message: "Email verified successfully! Your account is now active.",
                verified: true,
                redirectTo: "/login"
            }),
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            }
        );

    } catch (error) {
        console.error("Error verifying email:", error);
        return new Response(
            JSON.stringify({ 
                message: "An error occurred during email verification.", 
                error: error instanceof Error ? error.message : 'Unknown error'
            }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }
}