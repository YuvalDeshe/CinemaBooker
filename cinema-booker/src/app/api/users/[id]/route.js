import { MongoClient, ObjectId } from 'mongodb';
import bcrypt from 'bcryptjs';

import { sendEmail, generateProfileUpdateEmailHtml, generateProfileUpdateEmailText } from '@/lib/email';

const uri = "mongodb+srv://parkertheoutlaw_db_user:FC6qKAalpje0bIUU@cluster0.levqaeh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
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
            homeAddress: user.homeAddress || { street: "", city: "", state: "", zip: "" },
            paymentCard: user.paymentCard || [],
            isRegisteredForPromos: user.isRegisteredForPromos,
            userType: user.userType,
            userStatus: user.userStatus,
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
        const { db } = await connectToDatabase();
        const usersCollection = db.collection('UserCollection');
        const { id } = await params;

        if (!ObjectId.isValid(id)) {
            return new Response(JSON.stringify({ message: "Invalid User ID format" }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Get the current user data for email notification
        const currentUser = await usersCollection.findOne({ _id: new ObjectId(id) });
        if (!currentUser) {
            return new Response(JSON.stringify({ message: "User not found." }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const updateData = await request.json();
        const updateDoc = {};

        if (updateData.firstName) {
            updateDoc.firstName = updateData.firstName;
        }
        if (updateData.lastName) {
            updateDoc.lastName = updateData.lastName;
        }
        if (updateData.homeAddress) {
            updateDoc.homeAddress = updateData.homeAddress;
        }
        if (updateData.isRegisteredForPromos !== undefined) {
            updateDoc.isRegisteredForPromos = updateData.isRegisteredForPromos;
        }

        // ✅ Fetch existing user from DB
        const user = await usersCollection.findOne({ _id: new ObjectId(id) });
        if (!user) {
            return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
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
           let hashedPaymentCard = [];
            if (Array.isArray(updateData.paymentCard)) {
                hashedPaymentCard = await Promise.all(
                    updateData.paymentCard.map(async card => {
                        if (card.isNew) {
                        // hash the card number if the user added a new card
                        const hashedNumber = await bcrypt.hash(card.cardNumber, SALT_ROUNDS);
                        return {
                            cardType: card.cardType,
                            cardNumber: hashedNumber,
                            expMonth: card.expMonth,
                            expYear: card.expYear,
                            lastFour: card.cardNumber.slice(-4)
                        }
                    } else {
                        // don't rehash the card number if the card is already in the DB
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

        // Send profile update notification email
        const updatedFields = Object.keys(updateDoc);
        const userName = `${currentUser.firstName} ${currentUser.lastName}`;
        
        try {
            const emailResult = await sendEmail({
                to: currentUser.email,
                subject: 'Profile Updated - Cinema Booker',
                text: generateProfileUpdateEmailText(userName, updatedFields),
                html: generateProfileUpdateEmailHtml(userName, updatedFields),
            });

            if (!emailResult.success) {
                console.error('Failed to send profile update notification:', emailResult.error);
            }
        } catch (emailError) {
            console.error('Error sending profile update notification:', emailError);
            // Don't fail the update if email fails
        }

        return new Response(JSON.stringify({
            message: "User updated successfully.",
            updatedFields: updatedFields
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