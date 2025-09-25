// This file acts as a backend endpoint (a Route Handler) in Next.js.
// It will be executed on the server, allowing us to connect to MongoDB securely.

// Import the MongoClient class from the `mongodb` package.
const { MongoClient } = require('mongodb');

// This is your MongoDB Atlas connection string.
// **IMPORTANT:** In a real application, you should store this in a .env file
// for security and to avoid hard-coding credentials.
const uri = "mongodb+srv://parkertheoutlaw_db_user:FC6qKAalpje0bIUU@cluster0.levqaeh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; // Replace with your actual connection string

// Create a new MongoClient instance.
const client = new MongoClient(uri);

console.log("\nHello World\n");

// This is the function that handles a GET request to this endpoint.
// When you visit http://localhost:3000/api/movies, this function will run.
export async function GET(request) {
  try {
    // Connect to the MongoDB cluster.
    await client.connect();
    console.log("Connected successfully to MongoDB! 🎉");

    // Select the database. MongoDB will create it if it doesn't exist.
    const database = client.db('MoviesDatabase');

    // Select the collection. MongoDB will create it if it doesn't exist.
    const moviesCollection = database.collection('MoviesCollection');

    // Create an array of movie documents to insert.
    const movieDocuments = [
      {
        title: "Inception",
        genre: "Sci-Fi",
        description: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O."
      },
      {
        title: "The Matrix",
        genre: "Sci-Fi",
        description: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers."
      },
      {
        title: "Parasite",
        genre: "Thriller",
        description: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan."
      }
    ];

    // Insert the documents into the collection.
    const result = await moviesCollection.insertMany(movieDocuments);

    console.log(`${result.insertedCount} documents were inserted.`);

    // Return a JSON response to the client (the web browser in this case).
    return new Response(JSON.stringify({
      message: "Movies successfully inserted!",
      insertedCount: result.insertedCount
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });

  } catch (error) {
    // Log any errors that occur.
    console.error("Failed to connect or insert documents:", error);

    // Return an error response.
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
    // Ensures that the client will close when the operation is finished.
    // This is a crucial step to prevent memory leaks and resource exhaustion.
    await client.close();
    console.log("Connection closed.");
  }
}
