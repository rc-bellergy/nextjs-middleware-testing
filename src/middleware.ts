import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {

    console.log("Middleware is running");

    const jwtToken = request.cookies.get('jwt_token');

    if (!jwtToken) {
        console.log("No JWT token found. Redirecting to login page.");
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
      /*
       * Match all request paths except for the ones starting with:
       * - api (API routes)
       * - _next/static (static files)
       * - _next/image (image optimization files)
       * - favicon.ico, sitemap.xml, robots.txt (metadata files)
       * - login (login page)
       */
      '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|login).*)',
    ],
  }
