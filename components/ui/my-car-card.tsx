"use client"
import { deleteCar } from "@/lib/actions"
import { CalendarDaysIcon } from "@heroicons/react/24/outline"
import Image from "next/image"
import Link from "next/link"
import { AlertDeleteButton } from "./AlertDeleteButton"
interface Props {
  carDatas: any
}

const MyCarCard: React.FC<Props> = ({ carDatas }: Props) => {
  return (
    <div className="w-full md:h-full md:max-w-[25%] mt-8 md:mt-6 md:grow-0 group relative">
      <div className="h-10 w-full flex justify-between bg-gray-700 items-center p-4 absolute z-10">
        <AlertDeleteButton
          title="Etes vous absolument sur ?"
          clickOnDelete={() => deleteCar(carDatas.carId)}
        >
          Cette action est irréversible et supprimera votre véhicule de manière
          permanente.
        </AlertDeleteButton>
        <CalendarDaysIcon className="h-6 w-6 text-white" />
      </div>
      <Link
        href={{
          pathname: "/agency/updateCarPage",
          query: carDatas,
        }}
      >
        <div className="relative w-full h-auto md:max-h-[25%]">
          <Image
            src={carDatas.imageUrl}
            alt="car"
            width="0"
            height="0"
            sizes="100vw"
            className="w-full h-full hover:filter hover:brightness-75"
          />
        </div>
        <div className="mt-4 pl-3 border-l border-solid border-[#c2b2b2]">
          <p>
            {carDatas.brand} {carDatas.model} {carDatas.carYear}
          </p>
          <div className="grid grid-cols-3 gap-1">
            <p className="text-xs">Journée: {carDatas.dayPrice}€</p>
            <p className="text-xs">Caution: {carDatas.rentDeposit}€</p>
            <p className="text-xs">Puissance: {carDatas.horsePower}(CH)</p>
            <p className="text-xs">Semaine: {carDatas.weekPrice}€</p>
            <p className="text-xs">Carburant: {carDatas.fuelType}</p>
            <p className="text-xs">Moteur: {carDatas.engineType}</p>
            <p className="text-xs">Week-end: {carDatas.weekEndPrice}€</p>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default MyCarCard
