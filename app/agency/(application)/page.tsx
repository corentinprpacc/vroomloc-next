import { auth } from "@/auth"
import { Button } from "@/components/ui/button"
import { signOutAction } from "@/lib/actions"
import Link from "next/link"

export default async function AgencyHome() {
  const session = await auth()

  return (
    <main>
      {session?.user && (
        <div>
          <h1 className="text-3xl">Accueil - Agences</h1>
          <Link href={`/agency/addCarPage/${session.user.id}`}>
            Ajout véhicule
          </Link>
          <p>Welcome to {session.user.email}</p>
          <div className="bg-black p-2">
            <pre className="w-full text-white p-2 text-wrap">
              {JSON.stringify(session.user)}
            </pre>
          </div>
          <form action={signOutAction}>
            <Button>Sign Out</Button>
          </form>
        </div>
      )}
    </main>
  )
}
