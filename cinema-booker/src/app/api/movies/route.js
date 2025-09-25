import { MongoClient } from 'mongodb';

// MongoDB connection string. This should be in an environment variable for security.
const uri = "mongodb+srv://parkertheoutlaw_db_user:FC6qKAalpje0bIUU@cluster0.levqaeh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

// This function handles GET requests to /api/movies
export async function GET() {
    try {
        await client.connect();
        const db = client.db('MoviesDatabase');
        const moviesCollection = db.collection('MoviesCollection');

        // Find all documents in the collection
        const movies = await moviesCollection.find({}).toArray();

        // Map the documents to the desired frontend format
        const formattedMovies = movies.map(movie => ({
            title: movie.title,
            // Ensure genre is always an array of strings
            genre: Array.isArray(movie.genre)
                ? movie.genre.map(g => g.trim())
                : (typeof movie.genre === 'string' && movie.genre.includes(',')
                    ? movie.genre.split(',').map(g => g.trim())
                    : [movie.genre]),
            posterUrl: movie.png,
            director: movie.director,
            cast: movie.Cast,
            rating: movie.Rating,
            runTime: movie.RunTime,
            trailer: movie.trailer,
            isCurrentlyRunning: movie.isCurrentlyRunning === 'True',
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
    } finally {
        await client.close();
    }
}
