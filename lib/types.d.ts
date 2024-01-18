import { RentalAgency, User } from "@/app/firebase/types"

declare module "next-auth" {
  interface Session {
    user: RentalAgency
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: User
  }
}
