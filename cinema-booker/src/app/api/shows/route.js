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

        let newShow;
        try {
            newShow = await request.json();
        } catch (error_) {
            console.warn('Failed to parse JSON body for /api/shows POST', error_);
            return new Response(JSON.stringify({ message: "Invalid or missing JSON body." }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        if (!newShow || !newShow.movieID || !newShow.showRoomID || newShow.time === undefined || !newShow.date || !newShow.seatReservationArray) {
            return new Response(JSON.stringify({ message: "Missing required show fields." }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Validate IDs
        if (!ObjectId.isValid(newShow.movieID) || !ObjectId.isValid(newShow.showRoomID)) {
            return new Response(JSON.stringify({ message: "Invalid movieID or showRoomID format." }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const showToInsert = {
            movieID: new ObjectId(newShow.movieID),
            showRoomID: new ObjectId(newShow.showRoomID),
            movieTitle: newShow.movieTitle,
            showRoomName: newShow.showRoomName,
            time: newShow.time,
            date: newShow.date,
            seatReservationArray: newShow.seatReservationArray,
        };

        const result = await showsCollection.insertOne(showToInsert);

        const responseShow = {
            _id: result.insertedId,
            movieID: showToInsert.movieID,
            showRoomID: showToInsert.showRoomID,
            movieTitle: showToInsert.movieTitle,
            showRoomName: showToInsert.showRoomName,
            time: showToInsert.time,
            date: showToInsert.date,
            seatReservationArray: showToInsert.seatReservationArray,
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

export async function PUT(request) {
    try {
        const { db } = await connectToDatabase();
        const showsCollection = db.collection('ShowCollection');

        let updateData;
        try {
            updateData = await request.json();
        } catch (error_) {
            console.warn('Failed to parse JSON body for /api/shows PUT', error_);
            return new Response(JSON.stringify({ message: "Invalid or missing JSON body." }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const { showId, seatReservationArray } = updateData;

        if (!showId || !seatReservationArray) {
            return new Response(JSON.stringify({ message: "Missing showId or seatReservationArray." }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Validate showId
        if (!ObjectId.isValid(showId)) {
            return new Response(JSON.stringify({ message: "Invalid showId format." }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Update the show's seat reservation array
        const result = await showsCollection.updateOne(
            { _id: new ObjectId(showId) },
            { $set: { seatReservationArray: seatReservationArray } }
        );

        if (result.matchedCount === 0) {
            return new Response(JSON.stringify({ message: "Show not found." }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Fetch the updated show
        const updatedShow = await showsCollection.findOne({ _id: new ObjectId(showId) });

        return new Response(JSON.stringify({ 
            message: 'Seat reservations updated successfully!',
            show: updatedShow
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error("Failed to update seat reservations:", error);
        return new Response(JSON.stringify({ message: "An error occurred while updating seat reservations.", error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
