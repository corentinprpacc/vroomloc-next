import { auth } from "@/auth"
import RegisterForm from "@/components/ui/RegisterForm"
import { redirect } from "next/navigation"
import React from "react"

export default async function Register() {
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
        Agence - Création
      </h1>
      <div className="mt-16">
        <RegisterForm />
      </div>
    </div>
  )
}
