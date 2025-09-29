import { MongoClient, ObjectId } from 'mongodb';

const uri = "mongodb+srv://parkertheoutlaw_db_user:FC6qKAalpje0bIUU@cluster0.levqaeh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Declare a variable for the client outside the handler
let client;
let db;

// Function to connect to the database (only runs once)
async function connectToDatabase() {
    if (db) {
        return { client, db }; // Connection is already established
    }

    // Connect to the database
    client = new MongoClient(uri);
    await client.connect();
    db = client.db('MoviesDatabase');

    return { client, db };
}

export async function GET(request, { params }) {
    try {
        // Use the connection function instead of connecting on every call
        const { db } = await connectToDatabase();
        const moviesCollection = db.collection('MoviesCollection');

        // You do not need await params here, just destructure params
        const { id } = await params;

        // This line (13) will now succeed because the client is open
        const movie = await moviesCollection.findOne({ _id: new ObjectId(id) });

        if (!movie) {
            return new Response(JSON.stringify({ message: "Movie not found" }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Normalize castList and other fields (rest of your logic remains the same)
        let castList = [];
        if (Array.isArray(movie.Cast)) {
            castList = movie.Cast;
        } else if (typeof movie.Cast === "string") {
            castList = movie.Cast.split(",").map(actor => actor.trim());
        }

        const formattedMovie = {
            _id: movie._id,
            title: movie.title,
            description: movie.description,
            genre: Array.isArray(movie.genre)
                ? movie.genre
                : (typeof movie.genre === "string" && movie.genre.includes(",")
                    ? movie.genre.split(",").map(g => g.trim())
                    : [movie.genre]),
            posterUrl: movie.png,
            trailerLink: movie.trailer,
            director: movie.director,
            castList,
            rating: movie.Rating,
            runTime: movie.RunTime,
            isCurrentlyRunning: movie.isCurrentlyRunning,
            showTime: movie.showTime,
        };

        return new Response(JSON.stringify(formattedMovie), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error("Failed to fetch movie:", error);
        return new Response(JSON.stringify({ message: "An error occurred.", error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
    // REMOVED: The finally block with await client.close();
}