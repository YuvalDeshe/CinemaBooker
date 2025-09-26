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

        // Normalize castList and other fields
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
            isCurrentlyRunning: movie.isCurrentlyRunning === true || movie.isCurrentlyRunning === "true",
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
    } finally {
        await client.close();
    }
}