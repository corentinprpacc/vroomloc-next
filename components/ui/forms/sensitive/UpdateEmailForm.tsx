"use client"

import { useFormStatus } from "react-dom"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { z } from "zod"
import { UpdateEmailSchema } from "@/lib/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "next-auth/react"
import { updateUserEmail, updateUserGlobalInfos } from "@/lib/actions"
import Loader from "@/components/ui/Loader"
import { useToast } from "../../use-toast"

type InputUpdateEmail = z.infer<typeof UpdateEmailSchema>

export default function UpdateEmailForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { data: session, update } = useSession()
  const { toast } = useToast()
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<InputUpdateEmail>({
    resolver: zodResolver(UpdateEmailSchema),
  })
  const proccessForm = async (data: InputUpdateEmail) => {
    setIsLoading(true)
    try {
      // await updateUserGlobalInfos(session?.user.id || "", data)
      const result = await updateUserEmail(data)
      if (result && result.message) {
        // TODO set Error
        console.error(`Error: ${result.message}`)
        return
      }
      update({ email: data.email })
      toast({
        description: "Votre adresse email a été mise à jour",
        variant: "success",
      })
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
      <Label htmlFor="name" className="text-white">
        Email
      </Label>
      <div className="relative w-full">
        <Input
          className="bg-black text-white"
          id="email"
          type="email"
          placeholder="Saisissez votre nouvel email"
          required
          defaultValue={session?.user.email}
          {...register("email")}
          disabled={isLoading}
        />
        {errors.email && errors.email?.message && (
          <p className="text-red-400 mt-2">{errors.email.message}</p>
        )}
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
        <span>Mettre à jour mon adresse mail</span>
      ) : (
        <Loader className="w-8 h-8" />
      )}
    </Button>
  )
}
