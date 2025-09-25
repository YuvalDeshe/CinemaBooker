import { MongoClient } from 'mongodb';

// Your MongoDB Atlas connection string.
// **Note:** Always use environment variables for this in a production app.
const uri = "mongodb+srv://parkertheoutlaw_db_user:FC6qKAalpje0bIUU@cluster0.levqaeh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

// This function handles a GET request to the /api/movies/find endpoint.
export async function GET(request) {
    try {
        await client.connect();
        console.log("Connected successfully to MongoDB to find movie data.");

        const database = client.db('MoviesDatabase');
        const moviesCollection = database.collection('moviesCollection');

        // Find the single movie document by its title.
        // The findOne() method is more efficient for single document retrieval.
        const movieDocument = await moviesCollection.findOne({ title: "Inception" });

        if (!movieDocument) {
            // If the movie is not found, return a 404 Not Found response.
            return new Response(JSON.stringify({ message: "Movie not found." }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Return the found movie document as a JSON response.
        // We'll also remove the MongoDB _id field as it's not needed by the client.
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
