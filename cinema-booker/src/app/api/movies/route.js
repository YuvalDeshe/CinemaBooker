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
    db = client.db('MoviesDatabase');

    return { db };
}

export async function GET() {
    try {
        const { db } = await connectToDatabase();
        const moviesCollection = db.collection('MoviesCollection');

        const movies = await moviesCollection.find({}).toArray();

        const formattedMovies = movies.map(movie => ({
            _id: movie._id,
            title: movie.title,
            genre: movie.genre,
            posterUrl: movie.png,
            director: movie.director,
            cast: movie.Cast,
            rating: movie.Rating,
            runTime: movie.RunTime,
            trailer: movie.trailer,
            isCurrentlyRunning: movie.isCurrentlyRunning,
        }));

        return new Response(JSON.stringify(formattedMovies), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });

    } catch (error) {
        console.error("Failed to fetch movies:", error);
        return new Response(JSON.stringify({ message: "An error occurred.", error: error.message }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}