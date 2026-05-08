import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // CSP is a production security control. Skip in dev to allow eval()
  // which React uses for Fast Refresh and debugging callstacks.
  if (process.env.NODE_ENV === "development") {
    return NextResponse.next();
  }

  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");

  const csp = [
    "default-src 'self'",
    // script-src keeps 'unsafe-inline' for Next.js App Router internals (RSC hydration, chunk loading).
    // The nonce is present for forward-compatibility: when React/Next.js support nonce-based
    // inline scripts natively, drop 'unsafe-inline' and use only the nonce.
    `script-src 'self' 'unsafe-inline' 'nonce-${nonce}'`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https://tunedrop.org https://*.tunedrop.org",
    "connect-src 'self'",
    "font-src 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "object-src 'none'",
    "report-uri https://tunedrop.org/csp-report",
  ].join("; ");

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });

  response.headers.set("Content-Security-Policy", csp);

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icon.png).*)",
  ],
};
