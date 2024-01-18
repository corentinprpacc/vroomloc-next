import { auth } from "@/auth"
import LoginForm from "@/components/ui/LoginForm"
import { redirect } from "next/navigation"
import React from "react"

export default async function Login() {
  const session = await auth()
  if (session?.user) {
    if (!session?.user.role) {
      redirect("/more-infos")
    }
    redirect("/")
  }
  return (
    <div className="min-h-screen bg-black pt-8">
      <h1 className="text-4xl font-bold text-center text-white">
        Agence - Connexion
      </h1>
      <div className="mt-16">
        <LoginForm />
      </div>
    </div>
  )
}
