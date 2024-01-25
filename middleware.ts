import NextAuth from "next-auth"
import { authConfig } from "./auth.config"
import { NextResponse } from "next/server"
import {
  getRedirectAuthMiddlewareURL,
  getRedirectSensitiveDataMiddlewareURL,
} from "./middlewares/auth"

const agencyPath = "/agency"
const sensitivePath = "/agency/profile/edit/sensitive"

export default NextAuth(authConfig).auth(async (req) => {
  const isLoggedIn = !!req.auth && !!req.auth.user
  const user = req.auth?.user
  const { nextUrl } = req
  const { pathname } = nextUrl

  const redirect = (url: string) => {
    return NextResponse.redirect(new URL(url, nextUrl))
  }

  if (pathname.includes(agencyPath)) {
    const url = getRedirectAuthMiddlewareURL(isLoggedIn, user, pathname)
    if (url) return redirect(url)
  }
  if (pathname.includes(sensitivePath)) {
    const url = await getRedirectSensitiveDataMiddlewareURL(user, pathname)
    if (url) return redirect(url)
  }
  return NextResponse.next()
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}
