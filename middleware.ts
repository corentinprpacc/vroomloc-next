import NextAuth from "next-auth"
import { authConfig } from "./auth.config"

export default NextAuth(authConfig).auth((req) => {
  const isLoggedIn = !!req.auth
  const user = req.auth?.user
  const { nextUrl } = req
  if (nextUrl.pathname.includes("/agency")) {
    const authRoutes = ["/agency/login", "/agency/register"]
    const moreInfosRoute = "/agency/more-infos"
    if (
      isLoggedIn &&
      (authRoutes.includes(nextUrl.pathname) ||
        (nextUrl.pathname === moreInfosRoute && user?.role))
    ) {
      return Response.redirect(new URL("/agency", nextUrl))
    }
    if (!isLoggedIn && !authRoutes.includes(nextUrl.pathname)) {
      return Response.redirect(new URL("/agency/login", nextUrl))
    }
    if (
      isLoggedIn &&
      !user?.role &&
      nextUrl.pathname.includes("/agency") &&
      nextUrl.pathname !== moreInfosRoute
    ) {
      return Response.redirect(new URL("/agency/more-infos", nextUrl))
    }
  }
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}
