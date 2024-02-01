"use client"
import { getCarById } from "@/app/firebase/utils"
import { useState, useEffect } from "react"
import { Car } from "@/app/firebase/types"
import Modal from "react-modal"
import Image from "next/image"
import getWindowWidth from "@/lib/hooks/getWindowWidth"
import { Button } from "@/components/ui/button"
import SearchDatePicker from "@/components/ui/datesSearch"
import useTextToggle from "@/lib/hooks/toggleText"
import Carousel from "@/components/ui/carousel"
import { Controller, useForm, SubmitHandler } from "react-hook-form"
import { boolean, z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { BookFormSchema } from "@/lib/schema"
import FixedSlider from "@/components/ui/slider"

type FormValues = z.infer<typeof BookFormSchema>
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
  const {
    register,
    setValue,
    control,
    handleSubmit,
    watch,
    formState,
    formState: { isValidating },
  } = useForm<FormValues>({
    resolver: zodResolver(BookFormSchema),
    defaultValues: {
      paymentOptions: { name: "", value: false, price: 0 },
      guaranteeOptions: { name: "", value: false, price: 0 },
      kilometersOptions: { km: 0, value: false, price: 0 },
    },
  })
  const [car, setCar] = useState<Car | null>(null)
  const windowWidth = getWindowWidth()
  const isMobile = windowWidth <= 768
  const [startDate, setStartDate] = useState(new Date())
  const initialEndDate = new Date()
  initialEndDate.setDate(initialEndDate.getDate() + 2)
  const [endDate, setEndDate] = useState(initialEndDate)
  const initialDescription =
    "Documents demandées : permis de conduire, pièce identité et justificatif de domicile de moins de 3 mois. Caution : Empreinte de carte ou cash (si le propriétaire accepte) Fabriqué pour les conducteurs de véhicules de haute performance ! Le BMW M5 est"
  const {
    text: description,
    toggleText,
    showFullText,
  } = useTextToggle(initialDescription, 200)
  const classes = "basis-1/2"
  const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data)
  const [sliderKm, setSliderKm] = useState<number>(0)
  const [paymentOptions, setPaymentOptions] = useState([
    { name: "Acompte", value: true, price: 300 },
    { name: "Total", value: false, price: 600 },
  ])
  const [guaranteeOptions, setGuaranteeOptions] = useState([
    { name: "Caution Basique 3000 EUR", value: true, price: 3000 },
    { name: "Caution réduite à 2500 EUR", value: false, price: 2500 },
  ])
  const [kilometersOptions, setKilometersOptions] = useState([
    { km: 600, value: true, price: 200 },
    { km: 800, value: false, price: 250 },
  ])
  useEffect(() => {
    async function getCar() {
      if (id) {
        const data = await getCarById(id)
        setCar(data)
      }
    }

    getCar()
  }, [id])

  const handleOptionsClick = <T extends keyof FormValues>(
    index: number,
    options: FormValues[T][],
    setOptions: React.Dispatch<React.SetStateAction<FormValues[T][]>>,
    optionName: T,
  ) => {
    const updatedOptions = options.map((option, i) => {
      if (i === index) {
        return { ...option, value: true }
      } else {
        return { ...option, value: false }
      }
    })
    setOptions(updatedOptions)
    setValue(optionName as any, updatedOptions[index] as any)
  }

  const handlePaymentOptionsClick = (index: number) => {
    const updatedPaymentOptions = paymentOptions.map((option, i) => {
      if (i === index) {
        return { ...option, value: true }
      } else {
        return { ...option, value: false }
      }
    })
    setPaymentOptions(updatedPaymentOptions)
    setValue("paymentOptions", updatedPaymentOptions[index])
  }

  const handleGuaranteeOptionsClick = (index: number) => {
    const updatedGuaranteeOptions = guaranteeOptions.map((option, i) => {
      if (i === index) {
        return { ...option, value: true }
      } else {
        return { ...option, value: false }
      }
    })
    setGuaranteeOptions(updatedGuaranteeOptions)
    setValue("guaranteeOptions", updatedGuaranteeOptions[index])
  }

  // const handleInputSliderChange = (inputValue: number) => {
  //   setSliderKm(inputValue)
  //   setValue("kilometersMoreOptions", { value: inputValue })
  // }

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
          <div className="md:basis-1/2">
            <div className="flex flex-col justify-end items-start pb-28 modal-car--title">
              {isMobile && (
                <div className="flex flex-row mb-6 dark">
                  <Button variant="destructive" className="rounded-none">
                    RESERVEZ
                  </Button>
                  <Button
                    variant="ghost"
                    className="rounded-none text-white ml-4"
                  >
                    DETAILS
                  </Button>
                </div>
              )}
              <h1 className="text-white text-4xl md:text-5xl">
                {car?.brand} {car?.model} ({car?.city})
              </h1>
            </div>
          </div>
          <form
            className="md:basis-1/2 md:pl-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-wrap w-full">
              <div className="md:basis-1/2 grow-0 bg-black text-white text-center w-full">
                <div className="flex flex-col justify-center align-center w-full h-full p-6">
                  <p>TOTAL</p>
                  <div className="flex flex-row justify-center">
                    <p className="text-2xl">EUR {car?.dayPrice}</p>
                    <span className="text-[0.5rem] leading-normal">TTC</span>
                  </div>
                </div>
              </div>
              <div className="md:basis-1/2 grow-0 bg-white p-6 w-full text-center">
                <div>
                  <button type="submit">
                    DEMANDE DE RESERVATION
                    <br />
                    (empreinte bancaire de 1€)
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap w-full bg-black px-6 pb-6">
              <SearchDatePicker
                control={control}
                startDate={startDate}
                endDate={endDate}
                classes={classes}
              />
            </div>
            <div className="flex flex-wrap w-full bg-black px-6 pb-6 text-white">
              <p className="py-2">OPTIONS DE PAIEMENT</p>
              <hr className="w-full" />
              <div>
                {paymentOptions.map((option, index) => (
                  <label className="inline-flex mr-4 mt-4" key={index}>
                    <span
                      className="relative inline-flex cursor-pointer"
                      onClick={() =>
                        handleOptionsClick(
                          index,
                          paymentOptions,
                          setPaymentOptions,
                          "paymentOptions",
                        )
                      }
                    >
                      <span>
                        <Image
                          src={
                            option.value
                              ? "/images/icons/radio-button-checked-icon.svg"
                              : "/images/icons/radio-button-unchecked-icon.svg"
                          }
                          alt={
                            option.value ? "Checked button" : "Unchecked button"
                          }
                          width={24}
                          height={24}
                          className="relative z-10"
                        />
                      </span>
                    </span>
                    <span className="ml-2">{option.name}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap w-full bg-black px-6 pb-6 text-white">
              <p className="py-2">CAUTION</p>
              <hr className="w-full" />
              <div>
                {guaranteeOptions.map((option, index) => (
                  <label className="inline-flex mr-4 mt-4" key={index}>
                    <span
                      className="relative inline-flex cursor-pointer"
                      onClick={() =>
                        handleOptionsClick(
                          index,
                          guaranteeOptions,
                          setGuaranteeOptions,
                          "guaranteeOptions",
                        )
                      }
                    >
                      <span>
                        <Image
                          src={
                            option.value
                              ? "/images/icons/radio-button-checked-icon.svg"
                              : "/images/icons/radio-button-unchecked-icon.svg"
                          }
                          alt={
                            option.value ? "Checked button" : "Unchecked button"
                          }
                          width={24}
                          height={24}
                          className="relative z-10"
                        />
                      </span>
                    </span>
                    <span className="ml-2">{option.name}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap w-full bg-black px-6 pb-6 text-white">
              <p className="py-2">KILOMETRES INCLUS :</p>
              <hr className="w-full" />
              <div>
                {kilometersOptions.map((option, index) => (
                  <label className="inline-flex mr-4 mt-4" key={index}>
                    <span
                      className="relative inline-flex cursor-pointer"
                      onClick={() =>
                        handleOptionsClick(
                          index,
                          kilometersOptions,
                          setKilometersOptions,
                          "kilometersOptions",
                        )
                      }
                    >
                      <span>
                        <Image
                          src={
                            option.value
                              ? "/images/icons/radio-button-checked-icon.svg"
                              : "/images/icons/radio-button-unchecked-icon.svg"
                          }
                          alt={
                            option.value ? "Checked button" : "Unchecked button"
                          }
                          width={24}
                          height={24}
                          className="relative z-10"
                        />
                      </span>
                    </span>
                    <span className="ml-2">{option.km} km</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="w-full bg-black px-6 pb-6 text-white">
              <p className="py-2">KILOMETRES SUPPLÉMENTAIRES</p>
              <hr className="w-full mb-6" />
              {/* <FixedSlider
                control={control}
                onInputSliderChange={handleInputSliderChange}
              /> */}
            </div>
            <div className="w-full bg-black px-6 pb-6 text-white">
              <p className="py-2">KILOMETRES SUPPLÉMENTAIRES</p>
              <hr className="w-full" />
            </div>
          </form>
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
              <p>{description}</p>
              {description.length > 20 && (
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
