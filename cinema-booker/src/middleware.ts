// src/middleware.ts
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  const publicPaths = ["/", "/login", "/register", "/movie"];
  const unauthenticatedPaths = ["/login", "/register"];

  const isAuthenticated = !!token;

  // I wont lie chat told me to do this for the images I did for the login and sign up pages to work!
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

  console.log("isAuthenticated:", isAuthenticated, "| path:", pathname);

  const isPublic = publicPaths.some(p => pathname === p || pathname.startsWith(`${p}/`));

  // Redirect unauthenticated users trying to access protected routes
  if (!isAuthenticated && !isPublic) {
    console.log(`Unauthenticated user attempted to access illegal page: '${pathname}'`)
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Redirect authenticated users away from login/register pages
  if (isAuthenticated && unauthenticatedPaths.includes(pathname)) {
    console.log(`Authenticated user attempted to access illegal page: '${pathname}'`)
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|static|favicon.ico).*)"],
};
