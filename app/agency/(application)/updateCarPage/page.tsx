import UpdateCarForm from "@/components/ui/UpdateCarForm"
import { AddCarFormSchema } from "@/lib/schema"
import { z } from "zod"
type FormType = z.infer<typeof AddCarFormSchema>
export default function AddCarPage({
  searchParams,
}: {
  searchParams: FormType
}) {
  console.log("name pp", searchParams)

  return (
    <div className="bg-black text-white pt-6">
      <h1 className="text-4xl font-bold bg-black text-center text-white">
        Agence - Modification véhicule
      </h1>
      <div className="mt-8">
        <UpdateCarForm carDatas={searchParams} />
      </div>
    </div>
  )
}
