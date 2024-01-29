import AddCarForm from "@/components/ui/AddCarForm"
import { ArrowLeftIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
type AddCarPageProps = {
  params: {
    userId: string
  }
}

export default function AddCarPage({ params: { userId } }: AddCarPageProps) {
  return (
    <div className="bg-black text-white pt-6">
      <div className="flex justify-between pl-2 pr-2 mb-8">
        <p className=" hover:cursor-pointer">
          <Link href={"/agency/myCars"}>
            <ArrowLeftIcon className="h-6 w-6 text-white" />
          </Link>
        </p>
        <h1 className="text-4xl font-bold bg-black text-center text-white">
          Agence - Ajout véhicule
        </h1>
        <div></div>
      </div>
      <div className="mt-8">
        <AddCarForm currentUserId={userId} />
      </div>
    </div>
  )
}
