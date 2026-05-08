import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  // CSP is a production security control. Skip in dev to allow eval()
  // which React uses for Fast Refresh and debugging callstacks.
  if (process.env.NODE_ENV === "development") {
    return NextResponse.next();
  }

  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https://tunedrop.org https://*.tunedrop.org",
    "connect-src 'self'",
    "font-src 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "object-src 'none'",
  ].join("; ");

  const response = NextResponse.next();

  response.headers.set("Content-Security-Policy", csp);

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icon.png).*)",
  ],
};
