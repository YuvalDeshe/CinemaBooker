// src/middleware.ts
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  const publicPaths = ["/", "/login", "/register"];
  const unauthenticatedPaths = ["/login", "/register"];

  const isAuthenticated = !!token;

  console.log("isAuthenticated:", isAuthenticated, "| path:", pathname);

  // Redirect unauthenticated users trying to access protected routes
  if (!isAuthenticated && !publicPaths.includes(pathname)) {
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
