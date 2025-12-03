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
  const adminPaths = ["/admin"]

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

  // this is for protecting profile pages
  // when a user who is not logged in tries to access someone’s edit page directly,
  // they will be redirected to the homepage (no callback)
  // if they log in and are that same user (or an admin), they can continue
  // otherwise, they’ll be redirected to the homepage
  // Protect /user/:id/profile/edit
  const match = pathname.match(/^\/user\/([^/]+)\/profile(\/edit\/?)?$/);

  if (match) {
    const pathUserId = match[1];
    const isEditPage = Boolean(match[2]); // true if URL ends with /edit

    // Require authentication for both view + edit
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // Extract user + role from token
    const t = (token as any) ?? {};
    const tokenUserId = String(t.id ?? t.userId ?? t.sub ?? t.email);

    const isOwner = tokenUserId === pathUserId;

    // Only owner may view or edit
    if (!isOwner) {
      console.log(
        `Blocked ${isEditPage ? "edit" : "view"} access for user '${tokenUserId}' to '${pathname}'`
      );
      return NextResponse.redirect(new URL("/", req.url));
    }
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