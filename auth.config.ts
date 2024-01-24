import type { NextAuthConfig, Session } from "next-auth"
import { RentalAgency, User } from "./app/firebase/types"
import { getUserByEmail } from "./app/firebase/utils"

export const authConfig = {
  pages: {
    signIn: "/agency/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      return true
    },
    jwt({ token, user, trigger, session }: any) {
      // console.log("Token load: ", token)
      if (trigger === "update") {
        if (session.email) {
          // Todo Data verification on server
          token.user.email = session.email
        } else if (session.moreInfos) {
          // Data verification on the server
          token.user = { ...token.user, ...session.moreInfos, role: "company" }
        } else if (session.editGeneralInfos) {
          token.user = { ...token.user, ...session.editGeneralInfos }
        }
        return token
      }
      if (user) {
        const { password, ...userData } = user
        token.user = userData as User
      }
      return token
    },
    async session({ token, session }: any) {
      // if (!token.user.role) {
      //   const userFromDb = await getUserByEmail(session.user.email)
      //   session.user = userFromDb as RentalAgency
      //   return session
      // }
      session.user = token.user as RentalAgency
      return session
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig
