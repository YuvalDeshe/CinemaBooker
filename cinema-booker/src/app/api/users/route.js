import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';
import Status from '@/types/User';

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
            // Exclude: password, billingAddress, paymentCard
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
            $or: [{ username: newUser.username }, { email: newUser.email }]
        });

        if (existingUser) {
            return new Response(JSON.stringify({ message: "Username or email already in use." }), {
                status: 409, // Conflict
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const hashedPassword = await bcrypt.hash(newUser.password, SALT_ROUNDS);

        const userToInsert = {
            username: newUser.username,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            password: hashedPassword,
            billingAddress: newUser.billingAddress || null,
            paymentCard: newUser.paymentCard || [],
            isRegisteredForPromos: newUser.isRegisteredForPromos || false,
            userType: newUser.userType || "CUSTOMER",
            userStatus: newUser.userStatus || Status.INACTIVE,
        };

        const result = await usersCollection.insertOne(userToInsert);

        const responseUser = {
            _id: result.insertedId,
            username: userToInsert.username,
            firstName: userToInsert.firstName,
            lastName: userToInsert.lastName,
            email: userToInsert.email,
            isRegisteredForPromos: userToInsert.isRegisteredForPromos,
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