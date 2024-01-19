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
    jwt({ token, user }) {
      if (user) token.user = user as User
      return token
    },
    async session({ token, session }: any) {
      if (!session.user.role) {
        const userFromDb = await getUserByEmail(session.user.email)
        session.user = userFromDb as RentalAgency
        return session
      }
      session.user = token.user as RentalAgency
      return session
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig
