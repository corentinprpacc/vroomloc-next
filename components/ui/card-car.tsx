"use client"
import { Car } from "@/app/firebase/types"
import Image from "next/image"
import Link from "next/link"
import { Button } from "./button"
import React from "react"

interface Props {
  getCar: Car
}

const CardCar: React.FC<Props> = ({ getCar }: Props) => {
  const modalUrl = `/cars/${getCar.id}`
  return (
    <>
      <div className="w-full md:h-full md:max-w-[25%] md:pl-6 mt-8 md:mt-6 md:grow-0 group">
        <Link href={modalUrl}>
          <div className="relative w-full h-auto md:max-h-[25%] relative">
            <Image
              src="/images/car-image.webp"
              alt="car"
              width="0"
              height="0"
              sizes="100vw"
              className="w-full h-full hover:filter hover:brightness-75"
            />
            <Button
              variant="secondaryDarker"
              className="absolute top-1/2 left-1/2 transform-translate-center opacity-0 group-hover:opacity-100"
            >
              Réservez
            </Button>
          </div>
          <div className="mt-4 pl-3 border-l border-solid border-[#c2b2b2]">
            <p>
              {getCar.brand} {getCar.model} ({getCar.city})
            </p>
            <p className="text-xs">
              A partir de EUR {getCar.dayPrice} (1 jour)
            </p>
          </div>
        </Link>
      </div>
    </>
  )
}

export default CardCar
