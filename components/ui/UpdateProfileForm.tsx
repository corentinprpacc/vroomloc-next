"use client"

import { useFormStatus } from "react-dom"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { z } from "zod"
import { UpdateProfileFormSchema } from "@/lib/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "next-auth/react"
import { updateUserGlobalInfos } from "@/lib/actions"
import Loader from "./Loader"
import { useToast } from "./use-toast"

type InputUpdateProfile = z.infer<typeof UpdateProfileFormSchema>

export default function RegisterForm() {
  const [globalError, setGlobalError] = useState("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { data: session, update } = useSession()
  const { toast } = useToast()
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<InputUpdateProfile>({
    resolver: zodResolver(UpdateProfileFormSchema),
  })
  const proccessForm = async (data: InputUpdateProfile) => {
    setIsLoading(true)
    setGlobalError("")
    try {
      await updateUserGlobalInfos(session?.user.id || "", data)
      await update({
        editGeneralInfos: { ...data },
      })
      toast({
        description: "Votre profil a été mis à jour",
        variant: "success",
      })
    } catch (error) {
      console.error("Error: ", error)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className="w-full">
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
                    defaultValue={session?.user.name}
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
                    defaultValue={session?.user.firstName}
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
                  Nom Agence
                </Label>
                <div className="relative">
                  <Input
                    className="bg-black text-white"
                    id="companyName"
                    defaultValue={session?.user.companyName}
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
                    defaultValue={session?.user.phoneNumber}
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
                    defaultValue={session?.user.street}
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
                    defaultValue={session?.user.postalCode}
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
                    defaultValue={session?.user.city}
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
            </div>
          </div>
          <LoginButton isLoading={isLoading} />
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

function LoginButton({ isLoading }: { isLoading: boolean }) {
  const { pending } = useFormStatus()
  return (
    <Button
      variant="outline"
      className="mt-6 w-full text-black"
      aria-disabled={pending}
      disabled={isLoading}
    >
      {!isLoading ? (
        <span>Mettre à jour mes informations</span>
      ) : (
        <Loader className="w-8 h-8" />
      )}
    </Button>
  )
}
