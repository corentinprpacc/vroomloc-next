import { auth } from "@/auth"
import Provider from "@/components/ui/SessionProvider"

export default async function ApplicationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  return <Provider session={session}>{children}</Provider>
}
