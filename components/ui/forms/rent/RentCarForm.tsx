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
import InputRadioForm from "../../InputRadioForm"
import React from "react"
import InputCheckboxForm from "../../InputCheckboxForm"
import { updateDoc } from "firebase/firestore"

type FormValues = z.infer<typeof BookFormSchema>

interface RentCarFormProps {
  car: Car
}

const RentCarForm: React.FC<RentCarFormProps> = ({ car }: RentCarFormProps) => {
  const {
    register,
    setValue,
    control,
    handleSubmit,
    watch,
    formState: { isValidating, errors },
  } = useForm<FormValues>({
    resolver: zodResolver(BookFormSchema),
    defaultValues: {
      paymentOptions: { name: "", value: false, price: 0 },
      guaranteeOptions: { name: "", value: false, price: 0 },
      kilometersOptions: { name: "", value: false, price: 0 },
    },
  })
  const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data)
  const windowWidth = getWindowWidth()
  const isMobile = windowWidth <= 768
  const [startDate, setStartDate] = useState(new Date())
  const initialEndDate = new Date()
  initialEndDate.setDate(initialEndDate.getDate() + 2)
  const [endDate, setEndDate] = useState(initialEndDate)
  const classes = "basis-1/2"
  const [paymentOptions, setPaymentOptions] = useState([
    { name: "Acompte", value: true, price: 300 },
    { name: "Total", value: false, price: 600 },
  ])
  const [guaranteeOptions, setGuaranteeOptions] = useState([
    { name: "Caution Basique 3000 EUR", value: true, price: 3000 },
    { name: "Caution réduite à 2500 EUR", value: false, price: 2500 },
  ])
  const [kilometersOptions, setKilometersOptions] = useState([
    { name: "600 km", value: true, price: 200 },
    { name: "800 km", value: false, price: 250 },
  ])
  const [moreKilometersOptions, setMoreKilometersOptions] = useState([
    { km: 0, price: 0 },
    { km: 100, price: 50 },
    { km: 200, price: 100 },
    { km: 300, price: 150 },
    { km: 400, price: 200 },
    { km: 500, price: 250 },
  ])
  const [moreOptions, setMoreOptions] = useState([
    { name: "Décoration florale mariage", value: true, price: 200 },
    {
      name: "Package Premium Mariage (décoration florale voiture + vidéaste professionnel)",
      value: false,
      price: 250,
    },
    { name: "Shooting photo/vidéo professionnelle", value: true, price: 200 },
  ])

  const handleOptionsClick = <T extends keyof FormValues>(
    index: number,
    setOptions: React.Dispatch<React.SetStateAction<FormValues[T][]>>,
    options: FormValues[T][],
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

  const handleMultipleOptionsClick = <T extends keyof FormValues>(
    index: number,
    setOptions: React.Dispatch<React.SetStateAction<typeof moreOptions>>,
    options: typeof moreOptions,
    optionName: T,
  ) => {
    const updatedOptions: typeof moreOptions = options.map((option, i) => {
      if ("value" in option && i === index) {
        const updatedOption = {
          name: option.name,
          price: option.price,
          value: !option.value,
        }
        return updatedOption
      }
      return option
    })
    setOptions(updatedOptions)
    const selectedOptions = updatedOptions.filter((option) => {
      if ("value" in option) {
        return option.value === true
      }
      return false
    })
    setValue(optionName as any, selectedOptions)
  }

  const handleInputSliderChange = (
    selectedKilometerOption: { km: number; price: number } | null,
  ) => {
    if (selectedKilometerOption !== null) {
      setValue("moreKilometersOptions", selectedKilometerOption)
    }
  }
  return (
    <>
      <div className="md:basis-1/2">
        <div className="flex flex-col justify-end items-start pb-28 modal-car--title">
          {isMobile && (
            <div className="flex flex-row mb-6 dark">
              <Button variant="destructive" className="rounded-none">
                RESERVEZ
              </Button>
              <Button variant="ghost" className="rounded-none text-white ml-4">
                DETAILS
              </Button>
            </div>
          )}
          <h1 className="text-white text-4xl md:text-5xl">
            {car?.brand} {car?.model} ({car?.city})
          </h1>
        </div>
      </div>
      <form className="md:basis-1/2 md:pl-6" onSubmit={handleSubmit(onSubmit)}>
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
            <InputRadioForm
              data={paymentOptions}
              handleClick={(index) =>
                handleOptionsClick(
                  index,
                  setPaymentOptions,
                  paymentOptions,
                  "paymentOptions",
                )
              }
            />
          </div>
        </div>
        <div className="flex flex-wrap w-full bg-black px-6 pb-6 text-white">
          <p className="py-2">CAUTION</p>
          <hr className="w-full" />
          <div>
            <InputRadioForm
              data={guaranteeOptions}
              handleClick={(index) =>
                handleOptionsClick(
                  index,
                  setGuaranteeOptions,
                  guaranteeOptions,
                  "guaranteeOptions",
                )
              }
            />
          </div>
        </div>
        <div className="flex flex-wrap w-full bg-black px-6 pb-6 text-white">
          <p className="py-2">KILOMETRES INCLUS :</p>
          <hr className="w-full" />
          <div>
            <InputRadioForm
              data={kilometersOptions}
              handleClick={(index) =>
                handleOptionsClick(
                  index,
                  setKilometersOptions,
                  kilometersOptions,
                  "kilometersOptions",
                )
              }
            />
          </div>
        </div>
        <div className="w-full bg-black px-6 pb-6 text-white">
          <p className="py-2">KILOMETRES SUPPLÉMENTAIRES</p>
          <hr className="w-full mb-6" />
          <FixedSlider
            control={control}
            moreKilometersOptions={moreKilometersOptions}
            onInputSliderChange={handleInputSliderChange}
          />
        </div>
        <div className="w-full bg-black px-6 pb-6 text-white">
          <p className="py-2">KILOMETRES SUPPLÉMENTAIRES</p>
          <hr className="w-full" />
          <div>
            <InputCheckboxForm
              data={moreOptions}
              handleClick={(index) =>
                handleMultipleOptionsClick(
                  index,
                  setMoreOptions,
                  moreOptions,
                  "moreOptions",
                )
              }
            />
          </div>
        </div>
      </form>
    </>
  )
}

export default RentCarForm
