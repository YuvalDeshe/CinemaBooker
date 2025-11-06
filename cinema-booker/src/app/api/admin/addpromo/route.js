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
        db = client.db('MoviesDatabase');
    
        return { db };
    }

    try {
        const { db } = await connectToDatabase();
        const moviesCollection = db.collection('MoviesCollection');

        const newMovie = await request.json();

        const movieToInsert = {
            title: newMovie.title,
            genre: newMovie.genre,
            description: newMovie.description,
            png: newMovie.png,
            trailer: newMovie.trailer,
            director: newMovie.director,
            Cast: newMovie.Cast,
            Rating: newMovie.Rating,
            RunTime: newMovie.RunTime,
            isCurrentlyRunning: newMovie.isCurrentlyRunning,
        };

        const result = await moviesCollection.insertOne(movieToInsert);

        return new Response(JSON.stringify(result), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error("Failed to add new movie:", error);
        return new Response(JSON.stringify({ message: "An error occurred while adding the movie.", error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
