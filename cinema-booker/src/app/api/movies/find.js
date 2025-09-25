import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://parkertheoutlaw_db_user:FC6qKAalpje0bIUU@cluster0.levqaeh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

export async function GET(request) {
    try {
        await client.connect();
        console.log("Connected successfully to MongoDB to find movie data.");

        const database = client.db('MoviesDatabase');
        const moviesCollection = database.collection('moviesCollection');

        const movieDocument = await moviesCollection.findOne({ title: "Inception" });

        if (!movieDocument) {
            return new Response(JSON.stringify({ message: "Movie not found." }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const { _id, ...movieData } = movieDocument;

        return new Response(JSON.stringify(movieData), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });

    } catch (error) {
        console.error("Failed to find movie:", error);
        return new Response(JSON.stringify({
            message: "An error occurred.",
            error: error.message
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } finally {
        await client.close();
        console.log("Connection closed.");
    }
}
