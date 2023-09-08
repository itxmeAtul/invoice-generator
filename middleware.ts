import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  let token = request.cookies.has("Authorization");
  console.log("inside middleware11", token);

  if (token) {
    if (!request.nextUrl.pathname.startsWith("/invoice-generator"))
      return NextResponse.rewrite(new URL("/invoice-generator", request.url));
  } else {
    if (!request.nextUrl.pathname.startsWith("/login"))
      return NextResponse.rewrite(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/login", "/invoice-generator", "/invoice-generator/:path*", "/"],
};
