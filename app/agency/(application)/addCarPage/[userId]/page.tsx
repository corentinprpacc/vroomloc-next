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
    <div className="bg-black text-white">
      <div className="flex justify-between items-center pl-4 pr-2 mb-8 sticky top-0 z-20 bg-black h-20">
        <p className=" hover:cursor-pointer">
          <Link href={"/agency/myCars"}>
            <ArrowLeftIcon className="h-6 w-6 text-white" />
          </Link>
        </p>
        <h1 className="text-4xl font-bold text-center text-white">
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
