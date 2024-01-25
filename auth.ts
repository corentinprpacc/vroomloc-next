import NextAuth from "next-auth"
import { authConfig } from "./auth.config"
import Credentials from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import { z } from "zod"
import { FirestoreAdapter } from "@auth/firebase-adapter"
import { cert } from "firebase-admin/app"
import * as bcrypt from "bcryptjs"
import { getUserByEmail } from "./app/firebase/utils"
import { getEnv } from "./lib/utils"

export const {
  signIn,
  signOut,
  handlers: { GET, POST },
  auth,
} = NextAuth({
  ...authConfig,
  adapter: FirestoreAdapter({
    credential: cert({
      projectId: getEnv(
        "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
        process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      ),
      clientEmail: getEnv(
        "FIREBASE_CLIENT_EMAIL",
        process.env.FIREBASE_CLIENT_EMAIL,
      ),
      privateKey: getEnv(
        "FIREBASE_PRIVATE_KEY",
        process.env.FIREBASE_PRIVATE_KEY,
      )!.replace(/\\n/g, "\n"),
    }),
  }),
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials)
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data
          const user = await getUserByEmail(email)
          if (!user) return null
          const passwordsMatch = await bcrypt.compare(password, user.password)
          if (passwordsMatch) return user
        }
        return null
      },
    }),
    GoogleProvider({
      clientId: getEnv("GOOGLE_CLIENT_ID", process.env.GOOGLE_CLIENT_ID),
      clientSecret: getEnv(
        "GOOGLE_CLIENT_SECRET",
        process.env.GOOGLE_CLIENT_SECRET,
      ),
      allowDangerousEmailAccountLinking: true,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  secret: getEnv("AUTH_SECRET", process.env.AUTH_SECRET),
})
