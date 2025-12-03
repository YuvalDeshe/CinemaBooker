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
    db = client.db('PromoCodeDatabase');

    return { db };
}

export async function GET() {
    try {
        const { db } = await connectToDatabase();
        const promoCollection = db.collection('PromoCodeCollection');

        const promos = await promoCollection.find({}).toArray();

        const formattedPromos = promos.map(promo => ({
            _id: promo._id,
            name: promo.codeString,
            priceMultiplier: promo.priceMultiplier,
            endDate: promo.endDate,
            startDate: promo.startDate
        }));

        return new Response(JSON.stringify(formattedPromos), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });

    } catch (error) {
        console.error("Failed to fetch promos:", error);
        return new Response(JSON.stringify({ message: "An error occurred.", error: error.message }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}