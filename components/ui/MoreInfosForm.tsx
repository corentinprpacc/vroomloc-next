"use client"

import { useFormStatus } from "react-dom"
import { addMoreInfos } from "@/lib/actions"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { z } from "zod"
import { MoreInfosFormSchema } from "@/lib/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import Loader from "./Loader"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

type Inputs = z.infer<typeof MoreInfosFormSchema>

export default function MoreInfosForm() {
  const [globalError, setGlobalError] = useState("")
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(MoreInfosFormSchema),
  })
  const { update } = useSession()
  const [isLoading, setLoading] = useState<boolean>(false)
  const router = useRouter()
  const proccessForm = async (data: Inputs) => {
    setLoading(true)
    setGlobalError("")
    const result = await addMoreInfos(data)
    await update({
      moreInfos: {
        ...data,
      },
    })
    router.push("/agency")
    // if (!result) {
    // setLoading(false)
    // }
  }
  return (
    <div className="w-full">
      {isLoading && (
        <div className="transition-all z-50 bg-[rgba(0,0,0,0.70)] absolute top-0 h-screen w-screen flex justify-center items-center text-white">
          <Loader />
        </div>
      )}
      <form
        className="flex flex-col items-center mt-2"
        onSubmit={handleSubmit(proccessForm)}
      >
        <div className="flex-1 flex flex-col lg:w-1/3 sm:w-2/3 w-full items-center rounded-lg px-6">
          <div className="w-full">
            <div>
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
      Ajouter
    </Button>
  )
}
