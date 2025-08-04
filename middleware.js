import { NextResponse } from "next/server";

export default function middleware(req) {
  const token = req.cookies?.get("auth_token")?.value;

  const url = new URL("/login", req.url);
  if (!token) {
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard"],
};
