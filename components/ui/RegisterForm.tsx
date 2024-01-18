"use client"

import { useFormStatus } from "react-dom"
import { register as registerAgency, signInWithGoogle } from "@/lib/actions"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { useState } from "react"
import GoogleIcon from "../icons/GoogleIcon"
import { z } from "zod"
import { RegisterFormSchema } from "@/lib/schema"
import { zodResolver } from "@hookform/resolvers/zod"

type InputRegister = z.infer<typeof RegisterFormSchema>

export default function RegisterForm() {
  const [globalError, setGlobalError] = useState("")
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<InputRegister>({
    resolver: zodResolver(RegisterFormSchema),
  })
  const proccessForm = async (data: InputRegister) => {
    setGlobalError("")
    await registerAgency(data)
    console.log("Submit form")
    // if (result) {
    //   setGlobalError("Identifiant ou mot de passe incorrect")
    // }
  }
  return (
    <div className="w-full">
      <form
        className="flex flex-col items-center justify-center w-full"
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
            <span>Inscription avec Google</span>
          </Button>
        </div>
      </form>
      <form
        className="mt-8 flex flex-col items-center"
        onSubmit={handleSubmit(proccessForm)}
      >
        <div className="flex-1 flex flex-col w-1/3 items-center rounded-lg px-6">
          <div className="w-full">
            <div>
              <Label htmlFor="name" className="text-white">
                Nom
              </Label>
              <div className="relative">
                <Input
                  className="bg-black text-white"
                  id="name"
                  type="text"
                  placeholder="Saisissez votre nom"
                  required
                  {...register("name")}
                />
                {errors.name && errors.name?.message && (
                  <p className="text-red-400 mt-2">{errors.name.message}</p>
                )}
              </div>
            </div>
            <div className="mt-4">
              <Label htmlFor="firstName" className="text-white">
                Prénom
              </Label>
              <div className="relative">
                <Input
                  className="bg-black text-white"
                  id="firstName"
                  type="text"
                  placeholder="Saisissez votre prénom"
                  required
                  {...register("firstName")}
                />
                {errors.firstName && errors.firstName?.message && (
                  <p className="text-red-400 mt-2">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
            </div>
            <div className="mt-4">
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
              <Label htmlFor="email" className="text-white">
                Nom Agence
              </Label>
              <div className="relative">
                <Input
                  className="bg-black text-white"
                  id="companyName"
                  type="text"
                  placeholder="Saisissez le nom de l'agence"
                  required
                  {...register("companyName")}
                />
                {errors.companyName && errors.companyName?.message && (
                  <p className="text-red-400 mt-2">
                    {errors.companyName.message}
                  </p>
                )}
              </div>
            </div>
            <div className="mt-4">
              <Label htmlFor="password" className="text-white">
                Numéro de téléphone
              </Label>
              <div className="relative">
                <Input
                  className="bg-black text-white"
                  id="phoneNumber"
                  type="text"
                  placeholder="Saisissez votre numéro tel."
                  required
                  {...register("phoneNumber")}
                />
                {errors.phoneNumber && errors.phoneNumber?.message && (
                  <p className="text-red-400 mt-2">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>
            </div>
            <div className="mt-4">
              <Label htmlFor="password" className="text-white">
                Adresse
              </Label>
              <div className="relative">
                <Input
                  className="bg-black text-white"
                  id="street"
                  type="text"
                  placeholder="Saisissez votre adresse"
                  required
                  {...register("street")}
                />
                {errors.street && errors.street?.message && (
                  <p className="text-red-400 mt-2">{errors.street.message}</p>
                )}
              </div>
            </div>
            <div className="mt-4">
              <Label htmlFor="password" className="text-white">
                Code Postal
              </Label>
              <div className="relative">
                <Input
                  className="bg-black text-white"
                  id="postalCode"
                  type="text"
                  placeholder="Saisissez votre code postal"
                  required
                  {...register("postalCode")}
                />
                {errors.postalCode && errors.postalCode?.message && (
                  <p className="text-red-400 mt-2">
                    {errors.postalCode.message}
                  </p>
                )}
              </div>
            </div>
            <div className="mt-4">
              <Label htmlFor="password" className="text-white">
                Ville
              </Label>
              <div className="relative">
                <Input
                  className="bg-black text-white"
                  id="city"
                  type="text"
                  placeholder="Saisissez votre ville"
                  required
                  {...register("city")}
                />
                {errors.city && errors.city?.message && (
                  <p className="text-red-400 mt-2">{errors.city.message}</p>
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
            <div className="mt-4">
              <Label htmlFor="password" className="text-white">
                Confirmation du mot de passe
              </Label>
              <div className="relative">
                <Input
                  className="bg-black text-white"
                  id="password"
                  type="password"
                  placeholder="Confirmez votre mot de passe"
                  required
                  {...register("confirmPassword")}
                />
                {errors.confirmPassword && errors.confirmPassword?.message && (
                  <p className="text-red-400 mt-2">
                    {errors.confirmPassword.message}
                  </p>
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
    </div>
  )
}

function LoginButton() {
  const { pending } = useFormStatus()
  return (
    <Button variant="outline" className="mt-6 w-full" aria-disabled={pending}>
      Créer mon compte
    </Button>
  )
}
