"use client"

import { confirmSecurityPassword } from "@/lib/actions"
import { useForm } from "react-hook-form"
import { Button } from "./button"
import { Input } from "./input"
import { useState } from "react"
import Loader from "./Loader"
import { useRouter } from "next/navigation"

type InputPassword = {
  password: string
}

export default function SecurityPasswordForm() {
  const [error, setError] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { handleSubmit, register } = useForm<InputPassword>()
  const router = useRouter()
  const proccessForm = async (data: InputPassword) => {
    setIsLoading(true)
    setError("")
    const result = await confirmSecurityPassword(data)
    if (result && result.type === "error") {
      setError("Mot de passe incorrect.")
    }
    setIsLoading(false)
  }
  return (
    <>
      <form
        onSubmit={handleSubmit(proccessForm)}
        className="w-full sm:w-1/3 flex-col items-center text-black"
      >
        <Input
          type="password"
          disabled={isLoading}
          placeholder="Saisissez votre mot de passe actuel"
          {...register("password")}
          required
        />
        <Button
          variant="outline"
          disabled={isLoading}
          className="text-black w-full mt-4"
        >
          {!isLoading ? <span>Confirmez</span> : <Loader className="w-8 h-8" />}
        </Button>
        {error ? (
          <p className="bg-red-100 p-2 mt-4 rounded-md text-red-700">{error}</p>
        ) : null}
      </form>
      <Button
        onClick={() => router.push("/agency/profile/edit/general")}
        variant="destructive"
        className="mt-8 w-full sm:w-1/3"
        disabled={isLoading}
      >
        Annuler
      </Button>
    </>
  )
}
