module.exports = [
"[project]/CinemaBooker/cinema-booker/.next-internal/server/app/api/movies/[id]/route/actions.js [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__, module, exports) => {

}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/mongodb [external] (mongodb, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("mongodb", () => require("mongodb"));

module.exports = mod;
}),
"[project]/CinemaBooker/cinema-booker/src/app/api/movies/[id]/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongodb [external] (mongodb, cjs)");
;
const uri = "mongodb+srv://parkertheoutlaw_db_user:FC6qKAalpje0bIUU@cluster0.levqaeh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// Declare a variable for the client outside the handler
let client;
let db;
// Function to connect to the database (only runs once)
async function connectToDatabase() {
    if (db) {
        return {
            client,
            db
        }; // Connection is already established
    }
    // Connect to the database
    client = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__["MongoClient"](uri);
    await client.connect();
    db = client.db('MoviesDatabase');
    return {
        client,
        db
    };
}
async function GET(request, { params }) {
    try {
        // Use the connection function instead of connecting on every call
        const { db } = await connectToDatabase();
        const moviesCollection = db.collection('MoviesCollection');
        // You do not need await params here, just destructure params
        const { id } = await params;
        // This line (13) will now succeed because the client is open
        const movie = await moviesCollection.findOne({
            _id: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__["ObjectId"](id)
        });
        if (!movie) {
            return new Response(JSON.stringify({
                message: "Movie not found"
            }), {
                status: 404,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
        // Normalize castList and other fields (rest of your logic remains the same)
        let castList = [];
        if (Array.isArray(movie.Cast)) {
            castList = movie.Cast;
        } else if (typeof movie.Cast === "string") {
            castList = movie.Cast.split(",").map((actor)=>actor.trim());
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
            showTime: movie.showTime
        };
        return new Response(JSON.stringify(formattedMovie), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error("Failed to fetch movie:", error);
        return new Response(JSON.stringify({
            message: "An error occurred.",
            error: error.message
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
// REMOVED: The finally block with await client.close();
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__9f0b36a6._.js.map