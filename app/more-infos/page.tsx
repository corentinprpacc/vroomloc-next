import { auth } from "@/auth"
import MoreInfosForm from "@/components/ui/MoreInfosForm"
import { redirect } from "next/navigation"

export default async function moreInfo() {
  const session = await auth()
  console.log("more info page")
  if (!session?.user) {
    redirect("/")
  }
  if (session?.user && session.user.role) {
    redirect("/")
  }
  return (
    <div className="bg-black min-h-screen pt-8">
      <h1 className="text-center text-white text-3xl">
        Complétez ces informations
      </h1>
      <div className="mt-8">
        <MoreInfosForm />
      </div>
    </div>
  )
}
