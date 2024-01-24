import NextAuth from "next-auth"
import { authConfig } from "./auth.config"
import {
  checkUpdateSessionIsExpired,
  getUpdateUserDataByEmail,
} from "./app/firebase/utils"
import { deleteDoc } from "firebase/firestore"

const authRoutes = ["/agency/login", "/agency/register"]
const moreInfosRoute = "/agency/more-infos"
const agencyPath = "/agency"
const sensitivePath = "/agency/profile/edit/sensitive"
const sensitiveConfirmPath = "/agency/profile/edit/sensitive/confirm"

export default NextAuth(authConfig).auth(async (req) => {
  const isLoggedIn = !!req.auth && !!req.auth.user
  const user = req.auth?.user
  const { nextUrl } = req
  const redirect = (url: string) => {
    return Response.redirect(new URL(url, nextUrl))
  }
  if (isLoggedIn && !user) {
    if (process.env.NODE_ENV === "development") {
      throw new Error("Not able to fetch firebase database")
    } else {
      console.error("Error Fetching Firebase Firestore Data")
      return redirect("/")
    }
  }
  if (nextUrl.pathname.includes(agencyPath)) {
    if (
      isLoggedIn &&
      (authRoutes.includes(nextUrl.pathname) ||
        (nextUrl.pathname === moreInfosRoute && user?.role))
    ) {
      return redirect(agencyPath)
    }
    if (!isLoggedIn && !authRoutes.includes(nextUrl.pathname)) {
      return redirect("/agency/login")
    }
    if (
      isLoggedIn &&
      !user?.role &&
      nextUrl.pathname.includes("/agency") &&
      nextUrl.pathname !== moreInfosRoute
    ) {
      return redirect("/agency/more-infos")
    }
  }
  if (nextUrl.pathname.includes(sensitivePath)) {
    const updateUserData = await getUpdateUserDataByEmail(user?.email || "")
    if (updateUserData) {
      const isTokenExpired = checkUpdateSessionIsExpired(
        updateUserData?.data.expiresAt,
      )
      if (isTokenExpired && nextUrl.pathname === sensitivePath) {
        // TODO Remove document
        await deleteDoc(updateUserData.ref)
        return redirect(sensitiveConfirmPath)
      }
      if (!isTokenExpired && nextUrl.pathname === sensitiveConfirmPath) {
        return redirect(sensitivePath)
      }
    } else {
      if (nextUrl.pathname === sensitivePath) {
        return redirect(sensitiveConfirmPath)
      }
    }
  }
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}
