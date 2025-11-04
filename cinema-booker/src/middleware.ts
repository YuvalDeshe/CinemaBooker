// src/middleware.ts
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  const publicPaths = ["/", "/login", "/register", "/verify-email"];
  const unauthenticatedPaths = ["/login", "/register"];
  const verificationRequiredPaths = ["/booking"];
  const adminPaths = ["/admin", "/admin/addmovie"]

  const isAuthenticated = !!token;
  const isEmailVerified = token?.isEmailVerified ?? false;
  const userType = token?.userType ?? "USER";

  console.log("isAuthenticated:", isAuthenticated, "| path:", pathname);

  // Allow framework/static assets and API routes
  if (
    pathname.startsWith("/_next") ||            
    pathname.startsWith("/api/auth") ||         
    pathname.startsWith("/api/verify-email") ||
    pathname.startsWith("/posters/") ||         
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    /\.(png|jpg|jpeg|gif|svg|webp|ico|txt|map)$/i.test(pathname)
  ) {
    return NextResponse.next();
  }

  const isPublic = publicPaths.some(p => pathname === p || pathname.startsWith(`${p}/`));

  // Redirect authenticated users away from login/register pages
  if (isAuthenticated && unauthenticatedPaths.includes(pathname)) {
    console.log(`Authenticated user attempted to access login/register page: '${pathname}'`);
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Check email verification for booking pages
  if (isAuthenticated && !isEmailVerified && verificationRequiredPaths.some(path => pathname.startsWith(path))) {
    console.log(`Unverified user attempted to access booking: '${pathname}'`);
    return NextResponse.redirect(new URL("/?verification-required=true", req.url));
  }

  // Redirect unauthorized users away from admin pages
  if ((!isAuthenticated || userType !== "ADMIN") && adminPaths.some((path) => pathname.startsWith(path))) {
    console.log(`Unauthorized user attempted to access admin page: '${pathname}'`);
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|static|favicon.ico).*)"],
};