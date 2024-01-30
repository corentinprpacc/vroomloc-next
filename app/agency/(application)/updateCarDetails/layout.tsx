import { AddCarFormSchema } from "@/lib/schema"
import { ArrowLeftIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import { z } from "zod"
type FormType = z.infer<typeof AddCarFormSchema>
const UpdateCarDetailsLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const links = [
    {
      label: "Informations Générales",
      href: "/agency/updateCarDetails/general-information",
    },
    {
      label: "Image",
      href: "/agency/updateCarDetails/update-image",
    },
  ]
  return (
    <div className="bg-black text-white pt-6">
      <div className="flex justify-between pl-2 pr-2 mb-8">
        <p className=" hover:cursor-pointer">
          <Link href={"/agency/myCars"}>
            <ArrowLeftIcon className="h-6 w-6 text-white" />
          </Link>
        </p>
        <h1 className="text-4xl font-bold bg-black text-center text-white">
          Agence - Modifications véhicule
        </h1>
        <div></div>
      </div>

      <div className="mt-8">{children}</div>
    </div>
  )
}

export default UpdateCarDetailsLayout
