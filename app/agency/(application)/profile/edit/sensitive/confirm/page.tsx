import SecurityPasswordForm from "@/components/ui/SecurityPasswordForm"
import { Button } from "@/components/ui/button"
import { redirect } from "next/navigation"

export default async function page() {
  return (
    <div className="w-full absolute h-screen top-0 pt-4 bg-black flex flex-col items-center">
      <h1 className="font-medium text-lg">
        Confirm your password to edit your sensitive data
      </h1>
      <div className="w-full flex items-center justify-center flex-col mt-8">
        <SecurityPasswordForm />
      </div>
    </div>
  )
}
