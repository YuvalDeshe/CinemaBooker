import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI;

let client;
let db;

async function connectToDatabase() {
  if (db) return { db };

  client = new MongoClient(uri);
  await client.connect();
  db = client.db('ShowDatabase');

  return { db };
}

export async function GET(request, { params }) {
  try {
    const { db } = await connectToDatabase();
    const showCollection = db.collection('ShowCollection');
    const { id } = await params; 

    const show = await showCollection.findOne({ _id: new ObjectId(id) });
    
    const formattedShow = {
      _id: show._id,
      movieID: show.movieID,
      showRoomID: show.showRoomID,
      movieTitle: show.movieTitle,
      showRoomName: show.showRoomName,
      time: show.time,
      date: show.date,
      seatReservationArray: show.seatReservationArray,
    };

    return new Response(JSON.stringify(formattedShow), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error("Failed to fetch show info:", error);
    return new Response(JSON.stringify({ 
      message: "An error occurred.",
      error: error.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
