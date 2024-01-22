"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { authenticate, signInWithGoogle } from "@/lib/actions"
import { LoginFormSchema } from "@/lib/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useFormStatus } from "react-dom"
import { useForm } from "react-hook-form"
import { z } from "zod"
import GoogleIcon from "../icons/GoogleIcon"

type InputLogin = z.infer<typeof LoginFormSchema>

export default function LoginForm() {
  const [globalError, setGlobalError] = useState("")
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<InputLogin>({
    resolver: zodResolver(LoginFormSchema),
  })
  const proccessForm = async (data: InputLogin) => {
    setGlobalError("")
    const result = await authenticate(data)
    if (result) {
      setGlobalError("Identifiant ou mot de passe incorrect")
    }
  }
  return (
    <div className="w-full">
      <form
        className="flex flex-col items-center mt-2"
        onSubmit={handleSubmit(proccessForm)}
      >
        <div className="flex-1 flex flex-col w-1/3 items-center rounded-lg px-6">
          <div className="w-full">
            <div>
              <Label htmlFor="email" className="text-white">
                Email
              </Label>
              <div className="relative">
                <Input
                  className="bg-black text-white"
                  id="email"
                  type="email"
                  required
                  placeholder="Saisissez votre adresse mail"
                  {...register("email")}
                />
                {errors.email && errors.email?.message && (
                  <p className="text-red-400 mt-2">{errors.email.message}</p>
                )}
              </div>
            </div>
            <div className="mt-4">
              <Label htmlFor="password" className="text-white">
                Mot de passe
              </Label>
              <div className="relative">
                <Input
                  className="bg-black text-white"
                  id="password"
                  type="password"
                  placeholder="Saisissez votre mot de passe"
                  required
                  {...register("password")}
                />
                {errors.password && errors.password?.message && (
                  <p className="text-red-400 mt-2">{errors.password.message}</p>
                )}
              </div>
            </div>
          </div>
          <LoginButton />
          <div
            className="flex h-8 items-end space-x-1"
            aria-live="polite"
            aria-atomic="true"
          >
            {globalError && (
              <>
                <p className="text-sm text-red-500">{globalError}</p>
              </>
            )}
          </div>
        </div>
      </form>
      <form
        className="mt-2 flex flex-col items-center justify-center w-full"
        action={async () => {
          await signInWithGoogle()
        }}
      >
        <div className="w-1/3 px-6">
          <Button
            variant="outline"
            className="w-full flex gap-4 items-center relative"
          >
            <GoogleIcon />
            <span>Connexion avec Google</span>
          </Button>
        </div>
      </form>
    </div>
  )
}

function LoginButton() {
  const { pending } = useFormStatus()
  return (
    <Button variant="outline" className="mt-6 w-full" aria-disabled={pending}>
      Connexion
    </Button>
  )
}
