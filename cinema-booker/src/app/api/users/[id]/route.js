import { MongoClient, ObjectId } from 'mongodb';

const uri = "mongodb+srv://parkertheoutlaw_db_user:FC6qKAalpje0bIUU@cluster0.levqaeh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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
        const { db } = await connectToDatabase();
        const usersCollection = db.collection('UserCollection');
        const { id } = await params;

        if (!ObjectId.isValid(id)) {
            return new Response(JSON.stringify({ message: "Invalid User ID format" }), {
                status: 400,
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
        if (updateData.billingAddress) {
            updateDoc.billingAddress = updateData.billingAddress;
        }

        if (updateData.password) {
            console.log("PASSWORD UPDATE: Hashing new password using bcrypt.");
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(updateData.password, salt);
            updateDoc.password = hashedPassword;
        }

        if (updateData.paymentCard) {
            if (Array.isArray(updateData.paymentCard)) {
                updateDoc.paymentCard = updateData.paymentCard;
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