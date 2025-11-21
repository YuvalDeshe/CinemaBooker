import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

let client;
let db;

async function connectToDatabase() {
  if (db) return { client, db };
  client = new MongoClient(uri);
  await client.connect();
  db = client.db("PromoCodeDatabase");
  return { client, db };
}

export async function GET(request) {
  try {
    console.log("📡 [GET] /api/admin/addpromo/ called");

    const { db } = await connectToDatabase();
    console.log("✅ Connected to MongoDB");

    const promoCodeCollection = db.collection("PromoCodeCollection");
    const { searchParams } = new URL(request.url);
    const name = searchParams.get("name");
    console.log("🔎 Query parameter name:", name);

    if (!name) {
      console.warn("⚠️ Missing 'name' parameter");
      return new Response(JSON.stringify({ message: "Missing name parameter" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const codeString = name;
    const promo = await promoCodeCollection.findOne({ codeString });
    console.log("📦 Found promo:", promo);

    const response = {
      exists: !!promo,
      promo: promo ?? null,
    };

    console.log("✅ Returning response:", response);
    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("❌ Error checking promo code:", error);
    return new Response(
      JSON.stringify({ message: "Server error", error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export async function POST(request) {
    
    async function connectToDatabase() {
        if (db) {
            return { db };
        }
    
        client = new MongoClient(uri);
        await client.connect();
        db = client.db('PromoCodeDatabase');
    
        return { db };
    }

    try {
        const { db } = await connectToDatabase();
        const moviesCollection = db.collection('PromoCodeCollection');

        const newCode = await request.json();

        const codeToInsert = {
            codeString: newCode.name,
            priceMultiplier: newCode.discountMultiplier,
            startDate: newCode.startDate,
            endDate: newCode.endDate,
        };

        const result = await moviesCollection.insertOne(codeToInsert);

        return new Response(JSON.stringify(result), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error("Failed to add new promo code:", error);
        return new Response(JSON.stringify({ message: "An error occurred while adding the code.", error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
