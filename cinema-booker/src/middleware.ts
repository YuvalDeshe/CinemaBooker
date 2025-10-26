// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  const publicPaths = ["/", "/login", "/register", "/api/verify-email"];
  
  const movieBrowsingPaths = ["/movie"]; // Allow viewing movies and showtimes
  
  const authRequiredPaths = ["/user", "/profile"];
  
  const verificationRequiredPaths = ["/booking"]; // Only booking requires verification
  
  const unauthenticatedPaths = ["/login", "/register"];

  const isAuthenticated = !!token;
  const isEmailVerified = token?.isEmailVerified ?? false;

   if (
    pathname.startsWith("/_next") ||            
    pathname.startsWith("/api/auth") ||         
    pathname.startsWith("/posters/") ||         
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    /\.(png|jpg|jpeg|gif|svg|webp|ico|txt|map)$/i.test(pathname)
  ) {
    return NextResponse.next();
  }

  console.log("isAuthenticated:", isAuthenticated, "isEmailVerified:", isEmailVerified, "| path:", pathname);

  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  if (movieBrowsingPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  if (isAuthenticated && unauthenticatedPaths.includes(pathname)) {
    console.log(`Authenticated user attempted to access login/register page: '${pathname}'`)
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!isAuthenticated && authRequiredPaths.some(path => pathname.startsWith(path))) {
    console.log(`Unauthenticated user attempted to access auth-required page: '${pathname}'`)
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (!isAuthenticated && verificationRequiredPaths.some(path => pathname.startsWith(path))) {
    console.log(`Unauthenticated user attempted to access booking: '${pathname}'`)
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isAuthenticated && !isEmailVerified && verificationRequiredPaths.some(path => pathname.startsWith(path))) {
    console.log(`Unverified user attempted to access booking: '${pathname}'`);
    return NextResponse.redirect(new URL("/?verification-required=true", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|static|favicon.ico).*)"],
};
