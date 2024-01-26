import UpdateCarForm from "@/components/ui/UpdateCarForm"
import { AddCarFormSchema } from "@/lib/schema"
import Link from "next/link"
import { z } from "zod"
type FormType = z.infer<typeof AddCarFormSchema>
export default function UpdateCarPage({
  searchParams,
}: {
  searchParams: FormType
}) {
  return (
    <div className="bg-black text-white pt-6">
      <div className="flex justify-between pl-2 pr-2 mb-8">
        <p className=" hover:cursor-pointer">
          <Link href={"/agency/myCars"}>retour</Link>
        </p>
        <h1 className="text-4xl font-bold bg-black text-center text-white">
          Agence - Modifications véhicule
        </h1>
        <div></div>
      </div>
      <div className="mt-8">
        <UpdateCarForm carDatas={searchParams} />
      </div>
    </div>
  )
}
