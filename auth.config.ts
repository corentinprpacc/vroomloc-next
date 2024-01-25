import type { NextAuthConfig } from "next-auth"
import { RentalAgency, User } from "./app/firebase/types"
import {
  MoreInfosFormSchema,
  UpdateEmailSchema,
  UpdateProfileFormSchema,
} from "./lib/schema"

export const authConfig = {
  pages: {
    signIn: "/agency/login",
  },
  callbacks: {
    jwt({ token, user, trigger, session }: any) {
      if (trigger === "update") {
        if (session.email) {
          const result: any = UpdateEmailSchema.safeParse(session)
          if (result.success) token.user.email = session.email
        } else if (session.moreInfos) {
          const result = MoreInfosFormSchema.safeParse(session.moreInfos)
          if (result.success) {
            token.user = {
              ...token.user,
              ...session.moreInfos,
              role: "company",
            }
          }
        } else if (session.editGeneralInfos) {
          const result = UpdateProfileFormSchema.safeParse(
            session.editGeneralInfos,
          )
          if (result.success)
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
      session.user = token.user as RentalAgency
      return session
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig
