import { getUserCars } from "@/app/firebase/utils"
import { auth } from "@/auth"
import MyCarCard from "@/components/ui/my-car-card"

export default async function MyCars() {
  const session = await auth()
  const carsList = await getUserCars(session?.user.id!)

  return (
    <div className="bg-black text-white pt-6">
      <h1 className="text-4xl font-bold bg-black text-center text-white">
        Agence - Mes véhicules
      </h1>
      <div className="flex flex-wrap justify-around gap-2">
        {carsList.map((car: any, index: any) => {
          return <MyCarCard key={index} carDatas={car} />
        })}
      </div>
    </div>
  )
}
