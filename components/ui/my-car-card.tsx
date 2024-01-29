"use client"
import { deleteCar } from "@/lib/actions"
import { CalendarDaysIcon } from "@heroicons/react/24/outline"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { AlertDeleteButton } from "./AlertDeleteButton"
interface Props {
  carDatas: any
}

const MyCarCard: React.FC<Props> = ({ carDatas }: Props) => {
  const router = useRouter()

  async function deleteCarById(carId: string) {
    const response = await deleteCar(carId)

    if (response) {
      router.refresh()
    }
  }

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams()
    params.set(name, value)

    return params.toString()
  }

  const redirectCalendarPage = (brand: string, model: string) => {
    router.push(
      "/agency/carCalendar" +
        "?" +
        createQueryString("brand", brand) +
        "&" +
        createQueryString("model", model),
    )
  }

  return (
    <div className="w-96 h-[500px] bg-gray-700 mt-8 hover:bg-gray-600 transition-all md:mt-6 rounded relative">
      <div className="h-10 w-full flex justify-between items-center p-4">
        <AlertDeleteButton
          title="Etes vous absolument sur ?"
          clickOnDelete={() => deleteCarById(carDatas.carId)}
        >
          Cette action est irréversible et supprimera votre véhicule de manière
          permanente.
        </AlertDeleteButton>
        <CalendarDaysIcon
          onClick={() => redirectCalendarPage(carDatas.brand, carDatas.model)}
          className="h-6 w-6 text-white hover:cursor-pointer"
        />
      </div>
      <Link
        href={{
          pathname: "/agency/updateCarPage",
          query: carDatas,
        }}
      >
        <Image
          src={carDatas.imageUrl}
          alt="car"
          width="384"
          height="300"
          sizes="100vw"
          className="w-96 h-[300px]"
        />
        <div className="mt-4 pl-3 h-[144px]">
          <p className="bg-white text-gray-700 rounded-l pl-2">
            {carDatas.brand} {carDatas.model} {carDatas.carYear}
          </p>
          <div className="grid grid-cols-3 gap-1 mt-4">
            <p className="text-xs">Journée: {carDatas.dayPrice} €</p>
            <p className="text-xs">Caution: {carDatas.rentDeposit} €</p>
            <p className="text-xs">Puissance: {carDatas.horsePower} ch</p>
            <p className="text-xs">Semaine: {carDatas.weekPrice} €</p>
            <p className="text-xs">Carburant: {carDatas.fuelType}</p>
            <p className="text-xs">Moteur: {carDatas.engineType}</p>
            <p className="text-xs">Week-end: {carDatas.weekEndPrice} €</p>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default MyCarCard
