import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  let token = request.cookies.has("Authorization");
  console.log("inside middleware",token);
  if (token) {
    return NextResponse.rewrite(new URL("/",request.url));
  }
}

export const config = {
  matcher: ["/login", "/invoice-generator","/invoice-generator/:path"],
};
