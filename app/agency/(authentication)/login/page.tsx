import LoginForm from "@/components/ui/LoginForm"
import Link from "next/link"

export default async function Login() {
  return (
    <div className="min-h-screen bg-black pt-8">
      <h1 className="text-4xl font-bold text-center text-white">
        Agence - Connexion
      </h1>
      <div className="mt-16">
        <LoginForm />
      </div>
      <div className="mt-8 text-white text-center underline font-light">
        <Link href="/agency/register">
          Pas encore enregistré ? Inscrivez-vous ici
        </Link>
      </div>
    </div>
  )
}
