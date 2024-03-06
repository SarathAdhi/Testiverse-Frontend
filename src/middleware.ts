import { fetchUser } from "@lib/fetch-user";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { User } from "types/user";

export async function middleware(request: NextRequest) {
  const res = NextResponse.next();
  let bearerToken = cookies().get("bearer-token")?.value;

  let user: User | null = null;

  try {
    user = await fetchUser();
  } catch (error) {}

  const pathname = request.nextUrl.pathname;

  if (pathname === "/auth/verify") {
    if (user) return NextResponse.redirect(new URL("/dashboard", request.url));

    res.cookies.set("bearer-token", "");

    const searchParams = request.nextUrl.searchParams;

    const token = searchParams.get("token");
    const error = searchParams.get("error");

    if (error) return res;

    if (!token) return NextResponse.redirect(new URL("/auth", request.url));

    res.cookies.set("bearer-token", token);

    return res;
  }

  if (!user) {
    console.log("No AUTH M");
    res.cookies.delete("bearer-token");

    return NextResponse.redirect(new URL("/auth", request.url));
  }

  return res;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).)",
    "/((?!.+\\.[\\w]+$|_next).)",
    "/(api)(.*)",
    "/dashboard",
    "/auth/verify",
    "/showcase/:path*",
  ],
};
