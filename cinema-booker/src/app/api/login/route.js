import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';
const uri = process.env.MONGODB_URI;

let client;
let db;

async function connectToDatabase() {
    if (db) {
        return { client, db };
    }

    client = new MongoClient(uri);
    await client.connect();
    db = client.db('UserDatabase');
    return { client, db };
}

export async function POST(request) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return new Response(JSON.stringify({ message: "Email and password are required." }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const { db } = await connectToDatabase();
        const usersCollection = db.collection('UserCollection');

        const user = await usersCollection.findOne({ email: email });

        if (!user) {
            return new Response(JSON.stringify({ message: "Invalid credentials." }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return new Response(JSON.stringify({ message: "Invalid credentials." }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const responseData = {
            _id: user._id,
            username: user.username,
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            isRegisteredForPromos: user.isRegisteredForPromos,
            userType: user.userType,
            userStatus: user.userStatus,
        };

        return new Response(JSON.stringify({
            message: "Login successful.",
            user: responseData
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error("Login failed:", error);
        return new Response(JSON.stringify({ message: "An internal server error occurred.", error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
