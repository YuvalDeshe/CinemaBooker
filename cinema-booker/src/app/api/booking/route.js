import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

export async function POST(request) {
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

    try {
        const { db } = await connectToDatabase();
        const BookingCollection = db.collection('BookingCollection');

        const newBooking = await request.json();

        const bookingToInsert = {
        movieID: newBooking.movieID,
        promoCode: newBooking.promoCode,
        promoCodeID: newBooking.promoCodeID,
        showID: newBooking.showID,
        userID: newBooking.userID,
        paymentCardUsed: newBooking.paymentCardUsed,
        bookingDate: newBooking.bookingDate,
        orderTotal: newBooking.orderTotal,
        seats: newBooking.seats,
        tickets: newBooking.tickets,

        };

        const result = await BookingCollection.insertOne(bookingToInsert);

        return new Response(JSON.stringify(result), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error("Failed to add new booking:", error);
        return new Response(JSON.stringify({ message: "An error occurred while adding the booking.", error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
