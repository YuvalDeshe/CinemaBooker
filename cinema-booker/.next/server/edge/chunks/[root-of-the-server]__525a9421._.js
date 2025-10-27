(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/[root-of-the-server]__525a9421._.js",
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[project]/cinema-booker/src/middleware.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// src/middleware.ts
__turbopack_context__.s([
    "config",
    ()=>config,
    "middleware",
    ()=>middleware
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/cinema-booker/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cinema-booker/node_modules/next/dist/esm/server/web/exports/index.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2d$auth$2f$jwt$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cinema-booker/node_modules/next-auth/jwt/index.js [middleware-edge] (ecmascript)");
;
;
async function middleware(req) {
    const token = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2d$auth$2f$jwt$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getToken"])({
        req,
        secret: process.env.NEXTAUTH_SECRET
    });
    const { pathname } = req.nextUrl;
    const publicPaths = [
        "/",
        "/login",
        "/register",
        "/api/verify-email"
    ];
    const movieBrowsingPaths = [
        "/movie"
    ]; // Allow viewing movies and showtimes
    const authRequiredPaths = [
        "/user",
        "/profile"
    ];
    const verificationRequiredPaths = [
        "/booking"
    ]; // Only booking requires verification
    const unauthenticatedPaths = [
        "/login",
        "/register"
    ];
    const isAuthenticated = !!token;
    const isEmailVerified = token?.isEmailVerified ?? false;
    if (pathname.startsWith("/_next") || pathname.startsWith("/api/auth") || pathname.startsWith("/posters/") || pathname === "/favicon.ico" || pathname === "/robots.txt" || pathname === "/sitemap.xml" || /\.(png|jpg|jpeg|gif|svg|webp|ico|txt|map)$/i.test(pathname)) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
    }
    console.log("isAuthenticated:", isAuthenticated, "isEmailVerified:", isEmailVerified, "| path:", pathname);
    if (publicPaths.includes(pathname)) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
    }
    if (movieBrowsingPaths.some((path)=>pathname.startsWith(path))) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
    }
    if (isAuthenticated && unauthenticatedPaths.includes(pathname)) {
        console.log(`Authenticated user attempted to access login/register page: '${pathname}'`);
        return __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL("/", req.url));
    }
    if (!isAuthenticated && authRequiredPaths.some((path)=>pathname.startsWith(path))) {
        console.log(`Unauthenticated user attempted to access auth-required page: '${pathname}'`);
        return __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL("/login", req.url));
    }
    if (!isAuthenticated && verificationRequiredPaths.some((path)=>pathname.startsWith(path))) {
        console.log(`Unauthenticated user attempted to access booking: '${pathname}'`);
        return __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL("/login", req.url));
    }
    if (isAuthenticated && !isEmailVerified && verificationRequiredPaths.some((path)=>pathname.startsWith(path))) {
        console.log(`Unverified user attempted to access booking: '${pathname}'`);
        return __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL("/?verification-required=true", req.url));
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$cinema$2d$booker$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
}
const config = {
    matcher: [
        "/((?!_next|api|static|favicon.ico).*)"
    ]
};
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__525a9421._.js.map