import { auth } from "@/auth"
import { Button } from "@/components/ui/button"
import { signOutAction } from "@/lib/actions"
import Link from "next/link"

export default async function Home() {
  const session = await auth()
  return (
    <main>
      {session?.user && (
        <div>
          <p>Welcome to {session.user.email}</p>
          <div className="bg-black p-2 w-1/2">
            <pre className="w-full text-white p-2 text-wrap">
              {JSON.stringify(session.user)}
            </pre>
          </div>
          <form action={signOutAction}>
            <Button>Sign Out</Button>
          </form>
        </div>
      )}
      {!session?.user && (
        <div>
          <Link href="/login">Go to login Page</Link>
          <Link href="/register">Go to register Page</Link>
        </div>
      )}
    </main>
  )
}
