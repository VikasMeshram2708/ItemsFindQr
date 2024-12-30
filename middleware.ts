import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const session = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  console.log("ses", session);

  const publicRoutes = new Set(["/au/lo", "/au/sn", "/user/:path"]);

  const path = request.nextUrl.pathname;
  console.log("current-pat", path);

  const isPublicRoute = publicRoutes.has(path);

  if (!isPublicRoute && !session) {
    return NextResponse.redirect(new URL("/au/lo", request.url));
  }

  if (isPublicRoute && session) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: ["/user"],
};
