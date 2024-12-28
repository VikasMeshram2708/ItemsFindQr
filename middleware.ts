import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const session = await auth();
  console.log("ses", session);
  const publicRoutes = new Set(["/user(*)", "/au/lo", "/au/sn"]);
  const path = request.nextUrl.pathname;
  const isPublicRoute = publicRoutes.has(path);

  if (!session && !isPublicRoute) {
    return NextResponse.redirect(new URL("/au/lo", request.url));
  }

  if (session && isPublicRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: ["/", "/au/lo"],
};
