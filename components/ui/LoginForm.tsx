"use client"

import { authenticate, signInWithGoogle } from "@/lib/actions"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { useState } from "react"
import GoogleIcon from "../icons/GoogleIcon"
import { z } from "zod"
import { LoginFormSchema } from "@/lib/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import Loader from "./Loader"

type InputLogin = z.infer<typeof LoginFormSchema>

export default function LoginForm() {
  const [globalError, setGlobalError] = useState("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<InputLogin>({
    resolver: zodResolver(LoginFormSchema),
  })
  const proccessForm = async (data: InputLogin) => {
    setIsLoading(true)
    setGlobalError("")
    const result = await authenticate(data)
    if (result) {
      setGlobalError("Identifiant ou mot de passe incorrect")
    }
    setIsLoading(false)
  }
  return (
    <div className="w-full">
      <form
        className="flex flex-col items-center mt-2"
        onSubmit={handleSubmit(proccessForm)}
      >
        <div className="flex-1 flex flex-col lg:w-1/3 sm:w-2/3 w-full items-center rounded-lg px-6">
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
                  disabled={isLoading}
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
                  disabled={isLoading}
                />
                {errors.password && errors.password?.message && (
                  <p className="text-red-400 mt-2">{errors.password.message}</p>
                )}
              </div>
            </div>
          </div>
          <Button
            variant="outline"
            className="mt-6 w-full"
            disabled={isLoading}
          >
            {!isLoading ? (
              <span>Connexion</span>
            ) : (
              <Loader className="w-8 h-8" />
            )}
          </Button>
          {globalError && (
            <div
              className="flex items-center w-full bg-red-100 p-2 rounded-md my-4"
              aria-live="polite"
              aria-atomic="true"
            >
              <p className="text-sm text-red-700">{globalError}</p>
            </div>
          )}
        </div>
      </form>
      <form
        className="mt-4 flex flex-col items-center justify-center w-full"
        action={async () => {
          await signInWithGoogle()
        }}
      >
        <div className="lg:w-1/3 sm:w-2/3 w-full px-6">
          <Button
            variant="outline"
            className="w-full flex gap-4 items-center relative"
            disabled={isLoading}
          >
            <GoogleIcon />
            <span>Connexion avec Google</span>
          </Button>
        </div>
      </form>
    </div>
  )
}
