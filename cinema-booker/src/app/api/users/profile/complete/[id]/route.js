import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI;

let client;
async function getClient() {
  if (!client) client = new MongoClient(uri);
  if (!client.topology) await client.connect();
  return client;
}

export async function GET(request, { params }) {
  try {
    const client = await getClient();

    const bookingDB = client.db("BookingDatabase");
    const showDB = client.db("ShowDatabase");

    const bookingCollection = bookingDB.collection("BookingCollection");
    const showCollection = showDB.collection("ShowCollection");

    const { id } = await params;

    const userId = new ObjectId(id);

    // 1️⃣ Fetch bookings for the user
    const bookings = await bookingCollection.find({ userID: userId }).toArray();

    // 2️⃣ Extract show IDs
    const showIds = bookings.map(b => new ObjectId(b.showID));

    // 3️⃣ Fetch all shows in a single query
    const shows = await showCollection
      .find({ _id: { $in: showIds } })
      .toArray();

    // 4️⃣ Convert shows array into lookup table
    const showMap = new Map(shows.map(s => [s._id.toString(), s]));

    // 5️⃣ Build final combined list
    const complete = bookings.map(b => ({
      booking: b,
      show: showMap.get(b.showID.toString()),
    }));

    return new Response(JSON.stringify(complete), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ message: "Server error", error: err.message }),
      { status: 500 }
    );
  }
}
