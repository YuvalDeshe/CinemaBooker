import { MongoClient, ObjectId } from 'mongodb';
import { getServerSession } from 'next-auth';
import {authOptions} from '../../auth/[...nextauth]/route'
import bcrypt from 'bcryptjs';

const uri = process.env.MONGODB_URI;
const SALT_ROUNDS = 10;

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

export async function GET(request, { params }) {
    try {
        const { db } = await connectToDatabase();
        const usersCollection = db.collection('UserCollection');
        const  { id } = await params;
        const user = await usersCollection.findOne({ _id: new ObjectId(id) });

        if (!user) {
            return new Response(JSON.stringify({ message: "User not found" }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const formattedUser = {
            _id: user._id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password,
            homeAddress: user.homeAddress,
            paymentCard: user.paymentCard,
            isRegisteredForPromos: user.isRegisteredForPromos,
        };

        return new Response(JSON.stringify(formattedUser), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error("Failed to fetch user:", error);
        if (error.name === 'BSONTypeError') {
            return new Response(JSON.stringify({ message: "Invalid User ID format" }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        return new Response(JSON.stringify({ message: "An error occurred.", error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

export async function PATCH(request, { params }) {
    try {
        const session = await getServerSession(authOptions);
        const { id } = await params;

        if (!session) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        } else if (session.user.id !== id) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const { db } = await connectToDatabase();
        const usersCollection = db.collection('UserCollection');

        if (!ObjectId.isValid(id)) {
            return new Response(JSON.stringify({ message: "Invalid User ID format" }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const updateData = await request.json();
        const updateDoc = {};
        const user = await usersCollection.findOne({ email: updateData.email });

        if (updateData.firstName) {
            updateDoc.firstName = updateData.firstName;
        }
        if (updateData.lastName) {
            updateDoc.lastName = updateData.lastName;
        }
        if (updateData.password) {
            const isSamePassword = await bcrypt.compare(updateData.password, user.password);
            if (!(isSamePassword || updateData.password === user.password)) {
                console.log("PASSWORD UPDATE: Hashing new password using bcrypt.");
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(updateData.password, salt);
                updateDoc.password = hashedPassword;
            } else {
                updateDoc.password = user.password;
            }
        }

        if (updateData.paymentCard) {
            /*
            TODO:
            - add some logic to account for already existing cards
            */
           let hashedPaymentCard = [];
            if (Array.isArray(updateData.paymentCard)) {
                hashedPaymentCard = await Promise.all(
                    updateData.paymentCard.map(async card => {
                        if (card.isNew) {
                        const hashedNumber = await bcrypt.hash(card.cardNumber, SALT_ROUNDS);
                        return {
                            cardType: card.cardType,
                            cardNumber: hashedNumber,
                            expMonth: card.expMonth,
                            expYear: card.expYear,
                            lastFour: card.cardNumber.slice(-4)
                        }
                    } else {
                        return {
                            cardType: card.cardType,
                            cardNumber: card.cardNumber,
                            expMonth: card.expMonth,
                            expYear: card.expYear,
                            lastFour: card.lastFour
                        }
                    }
                    })
                )
                updateDoc.paymentCard = hashedPaymentCard;
            } else {
                return new Response(JSON.stringify({ message: "paymentCard must be an array." }), {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' },
                });
            }
        }

        if (Object.keys(updateDoc).length === 0) {
            return new Response(JSON.stringify({ message: "No valid fields provided for update." }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const result = await usersCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: updateDoc }
        );

        if (result.matchedCount === 0) {
            return new Response(JSON.stringify({ message: "User not found." }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        if (result.modifiedCount === 0) {
            return new Response(JSON.stringify({ message: "Update successful, but no fields were modified as the values were the same." }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        return new Response(JSON.stringify({
            message: "User updated successfully.",
            updatedFields: Object.keys(updateDoc)
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error("Failed to update user:", error);
        return new Response(JSON.stringify({ message: "An error occurred during update.", error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}