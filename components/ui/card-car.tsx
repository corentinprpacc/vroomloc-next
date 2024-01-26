"use client"
import { Car } from "@/app/firebase/types"
import Image from "next/image"
import Link from "next/link"
import { Button } from "./button"
import { useState } from "react"
import { usePathname, useRouter, useParams } from "next/navigation"
import CarsDetailsModal from "@/app/cars/[carId]"
import React from "react"

interface Props {
  getCar: Car
}

const CardCar: React.FC<Props> = ({ getCar }: Props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const pathName = usePathname()
  const router = useRouter()
  const modalUrl = `/cars/${encodeURIComponent(getCar.brand)}-${encodeURIComponent(getCar.model)}?id=${getCar.id}`
  const pageUrl = "/cars"
  console.log("car ", getCar)

  const openModalPage = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setModalIsOpen(true)
    window.history.pushState({}, "", modalUrl)
    document.body.classList.add("overflow-hidden")
    return false
  }

  const closeModal = () => {
    window.history.pushState({}, "", pageUrl)
    setModalIsOpen(false)
    document.body.classList.remove("overflow-hidden")
    router.push(pageUrl)
  }
  return (
    <>
      <div className="w-full md:h-full md:max-w-[25%] md:pl-6 mt-8 md:mt-6 md:grow-0 group">
        <Link href={modalUrl} onClick={openModalPage}>
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
      {modalIsOpen && (
        <CarsDetailsModal
          onClose={closeModal}
          isOpen={modalIsOpen}
          id={getCar.id}
        />
      )}
    </>
  )
}

export default CardCar
