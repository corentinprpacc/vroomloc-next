"use client"
import { getCarById } from "@/app/firebase/utils"
import { useState, useEffect } from "react"
import { Car } from "@/app/firebase/types"
import Modal from "react-modal"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import useTextToggle from "@/lib/hooks/toggleText"
import Carousel from "@/components/ui/carousel"
import RentCarForm from "@/components/ui/forms/rent/RentCarForm"
interface CarDetailsModalProps {
  onClose: () => void
  isOpen: boolean
  id: string
}

const CarsDetailsModal: React.FC<CarDetailsModalProps> = ({
  onClose,
  isOpen,
  id,
}: CarDetailsModalProps) => {
  const [car, setCar] = useState<Car | null>(null)
  const initialDescription =
    "Documents demandées : permis de conduire, pièce identité et justificatif de domicile de moins de 3 mois. Caution : Empreinte de carte ou cash (si le propriétaire accepte) Fabriqué pour les conducteurs de véhicules de haute performance ! Le BMW M5 est"
  const {
    text: description,
    toggleText,
    showFullText,
  } = useTextToggle(initialDescription, 200)
  useEffect(() => {
    async function getCar() {
      if (id) {
        const data = await getCarById(id)
        setCar(data)
      }
    }

    getCar()
  }, [id])

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel="Modal"
        portalClassName="modal"
      >
        <div className="absolute w-full h-full z-0 brightness-75">
          <Image
            src="/images/car-image.webp"
            alt="car"
            width={100}
            height={100}
            className="w-full h-full"
          />
        </div>
        <div className="relative z-10 px-8 pt-8 flex flex-wrap">
          <div className="basis-full grow-0">
            <div className="text-right">
              <button onClick={onClose}>
                <Image
                  src="/images/icons/remove-white-icon.svg"
                  alt="Close Modal"
                  width={24}
                  height={24}
                />
              </button>
            </div>
          </div>
          {car !== null && <RentCarForm car={car} />}
        </div>
        <div className="flex flex-col md:flex-row grow-0 basis-full px-8 pt-16 pb-8 text-white">
          <div className="md:basis-1/2 grow-0 bg-black px-4 pt-4 pb-8">
            {/* <Carousel slides={car?.images} /> */}
            <Carousel />
          </div>
          <div className="md:basis-1/2 grow-0 bg-black mt-6 md:mt-0 px-4 pt-4 pb-8">
            <div className="mb-2">
              <p className="py-2">CARACTERISTIQUES</p>
              <hr />
            </div>
            <div>
              <div className="inline-flex items-center h-[32px] m-2 border-[1px] border-solid border-[#bdbdbd] rounded-[16px]">
                <Image
                  src="/images/icons/bluetooth-icon.svg"
                  alt="bluetooth"
                  width={24}
                  height={24}
                />
                <span className="px-2 text-xs">Bluetooth</span>
              </div>
              <div className="inline-flex items-center h-[32px] m-2 border-[1px] border-solid border-[#bdbdbd] rounded-[16px]">
                <Image
                  src="/images/icons/bluetooth-icon.svg"
                  alt="bluetooth"
                  width={24}
                  height={24}
                />
                <span className="px-2 text-xs">Bluetooth</span>
              </div>
              <div className="inline-flex items-center h-[32px] m-2 border-[1px] border-solid border-[#bdbdbd] rounded-[16px]">
                <Image
                  src="/images/icons/bluetooth-icon.svg"
                  alt="bluetooth"
                  width={24}
                  height={24}
                />
                <span className="px-2 text-xs">Bluetooth</span>
              </div>
              <div className="inline-flex items-center h-[32px] m-2 border-[1px] border-solid border-[#bdbdbd] rounded-[16px]">
                <Image
                  src="/images/icons/bluetooth-icon.svg"
                  alt="bluetooth"
                  width={24}
                  height={24}
                />
                <span className="px-2 text-xs">Bluetooth</span>
              </div>
              <div className="inline-flex items-center h-[32px] m-2 border-[1px] border-solid border-[#bdbdbd] rounded-[16px]">
                <Image
                  src="/images/icons/bluetooth-icon.svg"
                  alt="bluetooth"
                  width={24}
                  height={24}
                />
                <span className="px-2 text-xs">Bluetooth</span>
              </div>
              <div className="inline-flex items-center h-[32px] m-2 border-[1px] border-solid border-[#bdbdbd] rounded-[16px]">
                <Image
                  src="/images/icons/bluetooth-icon.svg"
                  alt="bluetooth"
                  width={24}
                  height={24}
                />
                <span className="px-2 text-xs">Bluetooth</span>
              </div>
            </div>
            <div className="mt-16 mb-4">
              <p className="py-2">DESCRIPTION</p>
              <hr />
            </div>
            <div>
              <p>{car?.description}</p>
              {car?.description && car.description.length > 100 && (
                <Button
                  variant="ghost"
                  className="rounded-none border-[1px] border-solid border-white mt-4"
                  onClick={toggleText}
                >
                  {showFullText ? "Lire moins" : "Lire plus"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default CarsDetailsModal
