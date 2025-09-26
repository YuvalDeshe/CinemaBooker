import { MongoClient, ObjectId } from 'mongodb';

const uri = "mongodb+srv://parkertheoutlaw_db_user:FC6qKAalpje0bIUU@cluster0.levqaeh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

export async function GET(request, { params }) {
    try {
        await client.connect();
        const db = client.db('MoviesDatabase');
        const moviesCollection = db.collection('MoviesCollection');

        const { id } = params;
        const movie = await moviesCollection.findOne({ _id: new ObjectId(id) });

        if (!movie) {
            return new Response(JSON.stringify({ message: "Movie not found" }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Format the movie as needed for your frontend
        const formattedMovie = {
            title: movie.title,
            genre: Array.isArray(movie.genre)
                ? movie.genre.map(g => g.trim())
                : (typeof movie.genre === 'string' && movie.genre.includes(',')
                    ? movie.genre.split(',').map(g => g.trim())
                    : [movie.genre]),
            posterImgUrl: movie.png,
            director: movie.director,
            castList: Array.isArray(movie.Cast)
                ? movie.Cast
                : (typeof movie.Cast === 'string'
                    ? movie.Cast.split(',').map(c => c.trim())
                    : []),
            rating: movie.Rating,
            runtime: movie.RunTime,
            trailerLink: movie.trailer,
            isCurrentlyRunning: movie.isCurrentlyRunning === 'true',
            description: movie.description,
            showTime: movie.showTime,
            _id: movie._id,
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
    } finally {
        await client.close();
    }
}