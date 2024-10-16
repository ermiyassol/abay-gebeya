const PUBLIC_ROUTES = [
  "/",
  "/signin",
  "/signup",
  "/profile",
  "/home",
  "/contact",
  "/about",
];
const USER_ROUTES = ["/", "/orders", "/products", "/profile"];
const ADMIN_ROUTES = [
  "/",
  "/admin/dashboard",
  "/admin/inventory",
  "/admin/orders",
  "/admin/products",
  "/admin/profile",
  "/admin/users",
];
const MANAGER_ROUTES = ["/manager/inventory", "/manager/profile"];

import { RolesType } from "./types/enums/roleEnums";
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;

  const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);
  if (req?.auth && req?.auth?.user && !isPublicRoute) {
    const ROLE = req?.auth?.user?.role;
    if (ROLE == RolesType.USER && !USER_ROUTES.includes(nextUrl.pathname)) {
      return Response.redirect(`${process.env.NEXT_BASE_URL}/signin`);
    }

    if (ROLE == RolesType.ADMIN && !ADMIN_ROUTES.includes(nextUrl.pathname)) {
      return Response.redirect(`${process.env.NEXT_BASE_URL}/signin`);
    }

    if (
      ROLE == RolesType.MANAGER &&
      !MANAGER_ROUTES.includes(nextUrl.pathname)
    ) {
      return Response.redirect(`${process.env.NEXT_BASE_URL}/signin`);
    }
  }

  if (!req.auth && !isPublicRoute) {
    const url = req.url.replace(req.nextUrl.pathname, "/");
    return Response.redirect(`${process.env.NEXT_BASE_URL}`);
  }
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
