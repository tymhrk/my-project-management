import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/login") {
    return NextResponse.next();
  }

  const isProtectedPath = pathname.startsWith("/profile");
  const token = request.cookies.get("jwt_token");

  if (isProtectedPath && !token) {
    return NextResponse.redirect(
      new URL(`/login?from=${encodeURIComponent(pathname)}`, request.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*"],
};
