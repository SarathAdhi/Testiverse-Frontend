import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    console.log("MIDDLEWARE: ", req.nextauth.token);
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).)",
    "/((?!.+\\.[\\w]+$|_next).)",
    "/(api|trpc)(.*)",
    "/dashboard",
  ],
  pages: {
    signIn: "/login",
  },
};

//
