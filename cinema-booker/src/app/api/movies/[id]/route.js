import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI;

console.log('Loaded /api/movies/[id]/route.js');

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
            genre: movie.genre,
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
}

// copied format from api/users/[id] and edited for schedule show purposes
// change this as needed if issues arise or more functionality is required
export async function PATCH(request, { params }) {
    console.log('PATCH in /api/movies/[id]') // this never runs
    try {
        const { db } = await connectToDatabase();
        const moviesCollection = db.collection('MoviesCollection');
        const { id } = params;

        if (!ObjectId.isValid(id)) {
            return new Response(JSON.stringify({ message: "Invalid Movie ID format" }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Get the current movie data
        const currentMovie = await moviesCollection.findOne({ _id: ObjectId.createFromHexString(id) });
        if (!currentMovie) {
            return new Response(JSON.stringify({ message: "Movie not found." }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const updateData = await request.json();
        const updateDoc = {};
        console.log('updateDoc: ', updateDoc);

        if (updateData.title) {
            updateDoc.title = updateData.title;
        }
        if (updateData.genre) {
            updateDoc.genre = updateData.genre;
        }
        if (updateData.description) {
            updateDoc.description = updateData.description;
        }
        if (updateData.png) {
            updateDoc.png = updateData.png;
        }
        if (updateData.trailer) {
            updateDoc.trailer = updateData.trailer;
        }
        if (updateData.director) {
            updateDoc.director = updateData.director;
        }
        if (updateData.cast) {
            updateDoc.cast = updateData.cast;
        }
        if (updateData.rating) {
            updateDoc.rating = updateData.rating;
        }
        if (updateData.hasOwnProperty('isCurrentlyRunning')) { // Check if the property exists
            updateDoc.isCurrentlyRunning = updateData.isCurrentlyRunning;
        }

        console.log('updateDoc: ', updateDoc);

        if (Object.keys(updateDoc).length === 0) {
            return new Response(JSON.stringify({ message: "No valid fields provided for update." }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const result = await moviesCollection.updateOne(
            { _id: ObjectId.createFromHexString(id) },
            { $set: updateDoc }
        );

        if (result.matchedCount === 0) {
            return new Response(JSON.stringify({ message: "Movie not found." }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        if (result.modifiedCount === 0) {
            return new Response(JSON.stringify({ message: "Update successful, but no fields were modified as the values were the same." }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const updatedFields = Object.keys(updateDoc);
        return new Response(JSON.stringify({
            message: "Movie updated successfully.",
            updatedFields: updatedFields
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error("Failed to update movie:", error);
        return new Response(JSON.stringify({ message: "An error occurred during update.", error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}