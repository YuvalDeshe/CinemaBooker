import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

let client;
let db;

async function connectToDatabase() {
    if (db) {
        return { db };
    }

    client = new MongoClient(uri);
    await client.connect();
    db = client.db('ShowRoomDatabase');

    return { db };
}

// copied and changed from /api/movies; change if needed
export async function GET() {
    try {
        const { db } = await connectToDatabase();
        const showRoomCollection = db.collection('ShowRoomCollection');

        const showRooms = await showRoomCollection.find({}).toArray();

        const formattedShowRooms = showRooms.map(showRoom => ({
            _id: showRoom._id,
            roomName: showRoom.roomName,
            seats: showRoom.seats,
            numSeats: showRoom.seats.length,
        }));

        return new Response(JSON.stringify(formattedShowRooms), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });

    } catch (error) {
        console.error("Failed to fetch show rooms:", error);
        return new Response(JSON.stringify({ message: "An error occurred.", error: error.message }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}