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

  // this if for the admin page
  if (pathname.startsWith("/admin")) {
    // when a user is not logged in and tries to access admin page, It will send them to the log in page
    // with a callback url meaning if they log in and they are a admin it will take the to the page
    // if they are a regular user it will send them to the homepage
    if (!isAuthenticated) {
      const url = new URL("/login", req.url);
      url.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(url);
    }

    const role = String(
      (token as any)?.role ?? (token as any)?.userType ?? "USER"
    ).toUpperCase();

    if (role !== "ADMIN") {
      console.log(`Non-admin attempted to access admin page: '${pathname}'`);
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // this is for protecting edit profile pages
  // when a user who is not logged in tries to access someone’s edit page directly,
  // they will be redirected to the homepage (no callback)
  // if they log in and are that same user (or an admin), they can continue
  // otherwise, they’ll be redirected to the homepage
  const editMatch = pathname.match(/^\/user\/([^/]+)\/profile\/edit\/?$/);
  if (editMatch) {
    const pathUserId = editMatch[1];

    // 1) Require authentication → send to /
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // 2) Allow only the owner or admin
    const role = String(
      (token as any)?.role ?? (token as any)?.userType ?? "USER"
    ).toUpperCase();

    const tokenUserId =
      (token as any)?.id ??
      (token as any)?.userId ??
      (token as any)?.sub ??
      (token as any)?.email;

    const isOwner = String(tokenUserId) === String(pathUserId);
    const isAdmin = role === "ADMIN";

    if (!isOwner && !isAdmin) {
      console.log(
        `Blocked edit access for user '${tokenUserId}' to '${pathname}'`
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