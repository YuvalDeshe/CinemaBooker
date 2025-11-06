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

export async function GET(request) {
    try {
        console.log('Shows API called');
        const { db } = await connectToDatabase();
        const showCollection = db.collection('ShowCollection');

        // Get query parameters
        const url = new URL(request.url);
        const movieId = url.searchParams.get('movieId');
        const time = url.searchParams.get('time');
        const date = url.searchParams.get('date');

        console.log('Searching for shows with movieId:', movieId);

        // Build query
        let query = {};
        
        if (movieId) {
            // Try both string and ObjectId formats
            try {
                query.movieID = new ObjectId(movieId);
                console.log('Query (ObjectId format):', query);
            } catch (err) {
                query.movieID = movieId;
                console.log('Query (string format):', query);
            }
        }

        if (time) {
            query.time = parseInt(time);
        }

        if (date) {
            query.date = date;
        }

        const shows = await showCollection.find(query).toArray();
        console.log('Found shows:', shows.length);

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
            movieTitle: newShow.movieTitle,
            showRoomName: newShow.showRoomName,
            time: newShow.time,
            date: newShow.date,
            seatReservationArray: newShow.seatReservationArray,
        };

        const result = await showsCollection.insertOne(showToInsert);

        const responseShow = {
            _id: result.insertedId,
            movieID: result.movieID,
            showRoomID: result.showRoomID,
            movieTitle: result.movieTitle,
            showRoomName: result.showRoomName,
            time: result.time,
            date: result.date,
            seatReservationArray: result.seatReservationArray,
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
