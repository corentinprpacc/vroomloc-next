import RegisterForm from "@/components/ui/RegisterForm"
import Link from "next/link"
import React from "react"

export default async function Register() {
  return (
    <div className="min-h-screen bg-black pt-6">
      <h1 className="text-4xl font-bold text-center text-white">
        Agence - Création
      </h1>
      <div className="mt-8">
        <RegisterForm />
      </div>
      <div className="mt-4 text-white text-center underline font-light">
        <Link href="/agency/login">Déjà enregistré ? Connectez-vous ici</Link>
      </div>
    </div>
  )
}
