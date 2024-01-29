"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { register as registerAgency, signInWithGoogle } from "@/lib/actions"
import { RegisterFormSchema } from "@/lib/schema"
import { zodResolver } from "@hookform/resolvers/zod"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import GoogleIcon from "../icons/GoogleIcon"
import Loader from "./Loader"

type InputRegister = z.infer<typeof RegisterFormSchema>

export default function RegisterForm() {
  const [globalError, setGlobalError] = useState("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<InputRegister>({
    resolver: zodResolver(RegisterFormSchema),
  })
  const proccessForm = async (data: InputRegister) => {
    setIsLoading(true)
    setGlobalError("")
    const result = await registerAgency(data)
    if (result) {
      setGlobalError(result)
    }
    setIsLoading(false)
  }
  return (
    <div className="w-full">
      <form
        className="flex flex-col items-center justify-center w-full"
        action={async () => {
          await signInWithGoogle()
        }}
      >
        <div className="lg:w-1/3 md:w-2/3 w-full px-6">
          <Button
            variant="outline"
            className="w-full flex gap-4 items-center relative"
            disabled={isLoading}
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
        <div className="flex-1 flex flex-col md:w-2/3 w-full items-center rounded-lg px-6">
          <div className="w-full flex sm:flex-row flex-col justify-center sm:gap-16">
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
                    disabled={isLoading}
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
                    disabled={isLoading}
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
                    disabled={isLoading}
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
                    disabled={isLoading}
                  />
                  {errors.companyName && errors.companyName?.message && (
                    <p className="text-red-400 mt-2">
                      {errors.companyName.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-4">
                <Label htmlFor="phoneNumber" className="text-white">
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
                    disabled={isLoading}
                  />
                  {errors.phoneNumber && errors.phoneNumber?.message && (
                    <p className="text-red-400 mt-2">
                      {errors.phoneNumber.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="w-full">
              <div className="mt-4 sm:mt-0">
                <Label htmlFor="street" className="text-white">
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
                    disabled={isLoading}
                  />
                  {errors.street && errors.street?.message && (
                    <p className="text-red-400 mt-2">{errors.street.message}</p>
                  )}
                </div>
              </div>
              <div className="mt-4">
                <Label htmlFor="postalCode" className="text-white">
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
                    disabled={isLoading}
                  />
                  {errors.postalCode && errors.postalCode?.message && (
                    <p className="text-red-400 mt-2">
                      {errors.postalCode.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-4">
                <Label htmlFor="city" className="text-white">
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
                    disabled={isLoading}
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
                    disabled={isLoading}
                  />
                  {errors.password && errors.password?.message && (
                    <p className="text-red-400 mt-2">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-4">
                <Label htmlFor="confirmPassword" className="text-white">
                  Confirmation du mot de passe
                </Label>
                <div className="relative">
                  <Input
                    className="bg-black text-white"
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirmez votre mot de passe"
                    required
                    {...register("confirmPassword")}
                    disabled={isLoading}
                  />
                  {errors.confirmPassword &&
                    errors.confirmPassword?.message && (
                      <p className="text-red-400 mt-2">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                </div>
              </div>
            </div>
          </div>
          <Button
            variant="outline"
            className="mt-6 w-full"
            disabled={isLoading}
          >
            {!isLoading ? (
              <span>Créer mon compte</span>
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
    </div>
  )
}
