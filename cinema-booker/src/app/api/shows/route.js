import { MongoClient, ObjectId } from 'mongodb';
import bcrypt from 'bcryptjs';

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
    db = client.db('ShowDatabase');

    return { db };
}

export async function GET() {
    try {
        const { db } = await connectToDatabase();
        const showCollection = db.collection('ShowCollection');

        const shows = await showCollection.find({}).toArray();

        return new Response(JSON.stringify(shows), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });

    } catch (error) {
        console.error("Failed to fetch shows:", error);
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
        const showsCollection = db.collection('ShowCollection');

        const newShow = await request.json();

        if (!newShow.movieID || !newShow.showRoomID || !newShow.time || !newShow.date || !newShow.seatReservationArray) {
            return new Response(JSON.stringify({ message: "Missing required show fields." }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const showToInsert = {
            movieID: ObjectId.createFromHexString(newShow.movieID),
            showRoomID: ObjectId.createFromHexString(newShow.showRoomID),
            time: newShow.time,
            date: newShow.date,
            seatReservationArray: newShow.seatReservationArray,
        };

        const result = await showsCollection.insertOne(showToInsert);

        const responseShow = {
            _id: result.insertedId,
            movieID: newShow.movieID,
            showRoomID: newShow.showRoomID,
            time: newShow.time,
            date: newShow.date,
            seatReservationArray: newShow.seatReservationArray,
            message: 'Show scheduling successful!',
        };

        return new Response(JSON.stringify(responseShow), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error("Failed to add new show:", error);
        return new Response(JSON.stringify({ message: "An error occurred while creating the show.", error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
