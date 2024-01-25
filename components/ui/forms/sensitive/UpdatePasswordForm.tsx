"use client"

import { useFormStatus } from "react-dom"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { z } from "zod"
import { UpdatePasswordSchema } from "@/lib/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { updateUserPassword } from "@/lib/actions"
import Loader from "@/components/ui/Loader"
import { useToast } from "../../use-toast"

type InputUpdatePassword = z.infer<typeof UpdatePasswordSchema>

export default function UpdateEmailForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { toast } = useToast()
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<InputUpdatePassword>({
    resolver: zodResolver(UpdatePasswordSchema),
  })
  const proccessForm = async (data: InputUpdatePassword) => {
    setIsLoading(true)
    try {
      // await updateUserGlobalInfos(session?.user.id || "", data)
      const result = await updateUserPassword(data)
      if (result && result.message) {
        // TODO set Error
        console.error(`Error: ${result.message}`)
        return
      }
      toast({
        description: "Votre mot de passe a été mis à jour",
        variant: "success",
      })
      reset()
    } catch (error) {
      console.error("Error: ", error)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <form
      className="flex flex-col items-start gap-1 sm:w-1/3 w-full"
      onSubmit={handleSubmit(proccessForm)}
    >
      <div className="w-full">
        <Label htmlFor="name" className="text-white">
          Nouveau mot de passe
        </Label>
        <div className="relative w-full">
          <Input
            className="bg-black text-white"
            id="password"
            type="password"
            placeholder="Saisissez votre nouveau mot de passe"
            required
            {...register("password")}
            disabled={isLoading}
          />
          {errors.password && errors.password?.message && (
            <p className="text-red-400 mt-2">{errors.password.message}</p>
          )}
        </div>
        <div className="w-full mt-4">
          <Label htmlFor="name" className="text-white">
            Confirmation du nouveau mot de passe
          </Label>
          <div className="relative w-full">
            <Input
              className="bg-black text-white"
              id="confirmPassword"
              type="password"
              placeholder="Confirmez votre nouveau mot de passe"
              required
              {...register("confirmPassword")}
              disabled={isLoading}
            />
            {errors.confirmPassword && errors.confirmPassword?.message && (
              <p className="text-red-400 mt-2">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>
      </div>
      <LoginButton isLoading={isLoading} />
    </form>
  )
}

function LoginButton({ isLoading }: { isLoading: boolean }) {
  const { pending } = useFormStatus()
  return (
    <Button
      variant="outline"
      className="mt-2 w-full text-black"
      aria-disabled={pending}
      disabled={isLoading}
    >
      {!isLoading ? (
        <span>Mettre à jour mon mot de passe</span>
      ) : (
        <Loader className="w-8 h-8" />
      )}
    </Button>
  )
}
