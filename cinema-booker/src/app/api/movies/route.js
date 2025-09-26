import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://parkertheoutlaw_db_user:FC6qKAalpje0bIUU@cluster0.levqaeh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

export async function GET() {
    try {
        await client.connect();
        const db = client.db('MoviesDatabase');
        const moviesCollection = db.collection('MoviesCollection');

        const movies = await moviesCollection.find({}).toArray();

        const formattedMovies = movies.map(movie => ({
            title: movie.title,
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
            isCurrentlyRunning: movie.isCurrentlyRunning === 'true',
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
