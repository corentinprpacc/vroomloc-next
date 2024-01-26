import { Car } from "@/app/firebase/types"
import { getUserCars } from "@/app/firebase/utils"
import { auth } from "@/auth"
import MyCarCard from "@/components/ui/my-car-card"
import Link from "next/link"

export default async function MyCars() {
  const session = await auth()
  const carsList = await getUserCars(session?.user.id!)

  return (
    <div className="bg-black text-white pt-6 min-h-screen">
      <div className="flex justify-between pl-2 pr-2 mb-8">
        <div></div>
        <h1 className="text-4xl font-bold bg-black text-center text-white">
          Agence - Mes véhicules
        </h1>

        <p className=" hover:cursor-pointer">
          <Link href={`/agency/addCarPage/${session!.user.id}`}>
            Ajout véhicule
          </Link>
        </p>
      </div>
      <div className="flex flex-wrap justify-around gap-2">
        {carsList.map((car: Car, index: number) => {
          return <MyCarCard key={index} carDatas={car} />
        })}
      </div>
    </div>
  )
}
