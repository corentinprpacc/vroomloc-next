import NextAuth from "next-auth"
import { authConfig } from "./auth.config"
import {
  checkUpdateSessionIsExpired,
  getUpdateUserDataByEmail,
} from "./app/firebase/utils"
import { deleteDoc } from "firebase/firestore"

export default NextAuth(authConfig).auth(async (req) => {
  const isLoggedIn = !!req.auth && !!req.auth.user
  // console.log(req.auth)
  const user = req.auth?.user
  const { nextUrl } = req
  if (isLoggedIn && !user) {
    if (process.env.NODE_ENV === "development") {
      throw new Error("Not able to fetch firebase database")
    } else {
      return Response.redirect(new URL("/", nextUrl))
    }
  }
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
  if (nextUrl.pathname.includes("/agency/profile/edit/sensitive")) {
    const updateUserData = await getUpdateUserDataByEmail(user?.email || "")
    if (updateUserData) {
      const isTokenExpired = checkUpdateSessionIsExpired(
        updateUserData?.data.expiresAt,
      )
      if (
        isTokenExpired &&
        nextUrl.pathname === "/agency/profile/edit/sensitive"
      ) {
        // TODO Remove document
        await deleteDoc(updateUserData.ref)
        return Response.redirect(
          new URL("/agency/profile/edit/sensitive/confirm", nextUrl),
        )
      }
      if (
        !isTokenExpired &&
        nextUrl.pathname === "/agency/profile/edit/sensitive/confirm"
      ) {
        return Response.redirect(
          new URL("/agency/profile/edit/sensitive", nextUrl),
        )
      }
    } else {
      if (nextUrl.pathname === "/agency/profile/edit/sensitive") {
        return Response.redirect(
          new URL("/agency/profile/edit/sensitive/confirm", nextUrl),
        )
      }
    }
  }
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}
