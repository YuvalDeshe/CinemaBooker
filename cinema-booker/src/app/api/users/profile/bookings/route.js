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
    db = client.db('BookingDatabase');

    return { db };
}

export async function GET() {
    try {
        const { db } = await connectToDatabase();
        const bookingCollection = db.collection('BookingCollection');

        const bookings = await bookingCollection.find({}).toArray();

        const formattedBookings = bookings.map(booking => ({
            _id: booking._id,
            bookingDate: booking.bookingDate,
            orderTotal: booking.orderTotal,
            tickets: booking.tickets,
            promoCode: booking.promoCode,
            promoCodeID: booking.promoCodeID,
            showID: booking.showID,
            tickets: booking.tickets,
            userID: booking.userID, 
            seats: booking.seats,
        }));

        return new Response(JSON.stringify(formattedBookings), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });

    } catch (error) {
        console.error("Failed to fetch booking info:", error);
        return new Response(JSON.stringify({ message: "An error occurred.", error: error.message }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}