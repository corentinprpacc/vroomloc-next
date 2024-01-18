"use client"
import Image from "next/image"
import { Car } from "../firebase/types"
import { storage } from "../firebase/config"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"

interface Props {
  getCar: Car
}

const CardCar: React.FC<Props> = ({ getCar }: Props) => {
  return (
    <div className="w-full md:h-full md:max-w-[25%] md:pl-6 mt-8 md:mt-6 md:grow-0">
      <div className="relative w-full h-auto md:max-h-[25%]">
        <Image
          src="/images/car.jpeg"
          alt="car"
          width="0"
          height="0"
          sizes="100vw"
          className="w-full h-full"
        />
      </div>
      <div className="mt-4 pl-3 border-l border-solid border-[#c2b2b2]">
        <p>
          {getCar.brand} {getCar.model} ({getCar.city})
        </p>
        <p className="text-xs">A partir de EUR {getCar.dayPrice} (1 jour)</p>
      </div>
    </div>
  )
}

export default CardCar
