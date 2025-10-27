import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';
import Status from '@/types/User';
import { generateEmailVerificationToken } from '@/lib/tokens';
import { sendEmail, generateVerificationEmailHtml, generateVerificationEmailText } from '@/lib/email';

const uri = process.env.MONGODB_URI;
const SALT_ROUNDS = 10;

let client;
let db;

async function connectToDatabase() {
    if (db) {
        return { db };
    }

    client = new MongoClient(uri);
    await client.connect();
    db = client.db('UserDatabase');

    return { db };
}

export async function GET() {
    try {
        const { db } = await connectToDatabase();
        const usersCollection = db.collection('UserCollection');

        const users = await usersCollection.find({}).toArray();

        const formattedUsers = users.map(user => ({
            _id: user._id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            isRegisteredForPromos: user.isRegisteredForPromos,
            // Exclude: password, homeAddress, paymentCard
        }));

        return new Response(JSON.stringify(formattedUsers), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });

    } catch (error) {
        console.error("Failed to fetch users:", error);
        return new Response(JSON.stringify({ message: "An error occurred.", error: error.message }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}

export async function POST(request) {
    try {
        const { db } = await connectToDatabase();
        const usersCollection = db.collection('UserCollection');

        const newUser = await request.json();

        if (!newUser.password || !newUser.email || !newUser.firstName || !newUser.lastName) {
            return new Response(JSON.stringify({ message: "Missing required user fields." }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const existingUser = await usersCollection.findOne({
            email: newUser.email 
        });

        if (existingUser) {
            return new Response(JSON.stringify({ message: "Email already in use." }), {
                status: 409, // Conflict
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const hashedPassword = await bcrypt.hash(newUser.password, SALT_ROUNDS);
        let hashedPaymentCard = [];
        if (Array.isArray(newUser.paymentCard) && newUser.paymentCard.length > 0) {
            hashedPaymentCard = await Promise.all(
                newUser.paymentCard.map(card => bcrypt.hash(card, SALT_ROUNDS))
            );
        }

        // Generate email verification token
        const { token: emailVerificationToken, expires: emailVerificationExpires } = generateEmailVerificationToken();

        const userToInsert = {
            username: newUser.username,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            password: hashedPassword,
            homeAddress: newUser.homeAddress || null,
            paymentCard: hashedPaymentCard || [],
            isRegisteredForPromos: newUser.isRegisteredForPromos || false,
            userType: newUser.userType || "CUSTOMER",
            userStatus: newUser.userStatus || Status.INACTIVE,
            isEmailVerified: false,
            emailVerificationToken: emailVerificationToken,
            emailVerificationExpires: emailVerificationExpires,
        };

        const result = await usersCollection.insertOne(userToInsert);

        // Send verification email
        const verificationUrl = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/verify-email?token=${emailVerificationToken}`;
        
        try {
            const emailResult = await sendEmail({
                to: newUser.email,
                subject: 'Verify Your Email - Cinema Booker',
                text: generateVerificationEmailText(verificationUrl, newUser.email),
                html: generateVerificationEmailHtml(verificationUrl, newUser.email),
            });

            if (!emailResult.success) {
                console.error('Failed to send verification email:', emailResult.error);
                // Note: We don't fail the registration if email sending fails
            }
        } catch (emailError) {
            console.error('Error sending verification email:', emailError);
            // Note: We don't fail the registration if email sending fails
        }

        const responseUser = {
            _id: result.insertedId,
            username: userToInsert.username,
            firstName: userToInsert.firstName,
            lastName: userToInsert.lastName,
            email: userToInsert.email,
            isRegisteredForPromos: userToInsert.isRegisteredForPromos,
            message: 'Registration successful! Please check your email to verify your account.',
        };

        return new Response(JSON.stringify(responseUser), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error("Failed to add new user:", error);
        return new Response(JSON.stringify({ message: "An error occurred while creating the user.", error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
