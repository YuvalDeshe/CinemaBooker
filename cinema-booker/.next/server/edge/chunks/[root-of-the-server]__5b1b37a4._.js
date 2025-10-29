(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/[root-of-the-server]__5b1b37a4._.js",
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[project]/CinemaBooker/cinema-booker/src/middleware.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// src/middleware.ts
__turbopack_context__.s([
    "config",
    ()=>config,
    "middleware",
    ()=>middleware
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2d$auth$2f$jwt$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/CinemaBooker/cinema-booker/node_modules/next-auth/jwt/index.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/CinemaBooker/cinema-booker/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/CinemaBooker/cinema-booker/node_modules/next/dist/esm/server/web/exports/index.js [middleware-edge] (ecmascript)");
;
;
async function middleware(req) {
    const token = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2d$auth$2f$jwt$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getToken"])({
        req,
        secret: process.env.NEXTAUTH_SECRET
    });
    const { pathname } = req.nextUrl;
    const publicPaths = [
        "/",
        "/login",
        "/register",
        "/verify-email"
    ];
    const unauthenticatedPaths = [
        "/login",
        "/register"
    ];
    const verificationRequiredPaths = [
        "/booking"
    ];
    const isAuthenticated = !!token;
    const isEmailVerified = token?.isEmailVerified ?? false;
    console.log("isAuthenticated:", isAuthenticated, "| path:", pathname);
    // Allow framework/static assets and API routes
    if (pathname.startsWith("/_next") || pathname.startsWith("/api/auth") || pathname.startsWith("/api/verify-email") || pathname.startsWith("/posters/") || pathname === "/favicon.ico" || pathname === "/robots.txt" || pathname === "/sitemap.xml" || /\.(png|jpg|jpeg|gif|svg|webp|ico|txt|map)$/i.test(pathname)) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
    }
    const isPublic = publicPaths.some((p)=>pathname === p || pathname.startsWith(`${p}/`));
    // Redirect authenticated users away from login/register pages
    if (isAuthenticated && unauthenticatedPaths.includes(pathname)) {
        console.log(`Authenticated user attempted to access login/register page: '${pathname}'`);
        return __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL("/", req.url));
    }
    // Check email verification for booking pages
    if (isAuthenticated && !isEmailVerified && verificationRequiredPaths.some((path)=>pathname.startsWith(path))) {
        console.log(`Unverified user attempted to access booking: '${pathname}'`);
        return __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL("/?verification-required=true", req.url));
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$CinemaBooker$2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
}
const config = {
    matcher: [
        "/((?!_next|api|static|favicon.ico).*)"
    ]
};
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__5b1b37a4._.js.map