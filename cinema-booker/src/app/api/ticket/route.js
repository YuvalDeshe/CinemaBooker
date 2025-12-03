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
    db = client.db('TicketDatabase');

    return { db };
}

export async function GET() {
    try {
        const { db } = await connectToDatabase();
        const ticketCollection = db.collection('TicketCollection');

        const tickets = await ticketCollection.find({}).toArray();

        const formattedTickets = tickets.map(ticket => ({
            ticketType: ticket.ticketType,
            ticketPrice: ticket.ticketPrice
        }));

        return new Response(JSON.stringify(formattedTickets), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });

    } catch (error) {
        console.error("Failed to fetch tickets:", error);
        return new Response(JSON.stringify({ message: "An error occurred.", error: error.message }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}