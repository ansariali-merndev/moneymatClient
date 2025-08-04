import { NextResponse } from "next/server";
import { handleTokenVerify } from "./public/axios";

export default async function middleware(req) {
  const token = req.cookies?.get("auth_token")?.value;

  const url = new URL("/login", req.url);
  if (!token) {
    return NextResponse.redirect(url);
  }

  const res = await handleTokenVerify({ token });
  console.log(res);
  if (!res?.success) {
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard"],
};
