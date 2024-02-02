import { Car } from "@/app/firebase/types"
import { getUserCars } from "@/app/firebase/utils"
import { auth } from "@/auth"
import MyCarCard from "@/components/ui/my-car-card"
import { PlusCircleIcon } from "@heroicons/react/24/outline"
import Link from "next/link"

export default async function MyCars() {
  const session = await auth()
  const carsList = await getUserCars(session?.user.id!)

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="flex justify-between items-center pl-2 pr-3 sticky top-0 z-20 bg-black h-20">
        <div></div>
        <h1 className="text-4xl font-bold bg-purple text-center text-white">
          Mes véhicules
        </h1>

        <p className=" hover:cursor-pointe">
          <Link href={`/agency/addCarPage/${session!.user.id}`}>
            <PlusCircleIcon className="h-8 w-8 text-blue-500" />
          </Link>
        </p>
      </div>
      <div className="flex flex-wrap justify-around gap-2 pb-5">
        {carsList.map((car: Car, index: number) => {
          return <MyCarCard key={index} carDatas={car} />
        })}
      </div>
    </div>
  )
}
