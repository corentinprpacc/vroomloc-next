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
    formState,
    formState: { isValidating },
  } = useForm<FormValues>({
    resolver: zodResolver(BookFormSchema),
    defaultValues: {
      //   paymentOptions: { name: "", value: false, price: 0 },
      guaranteeOptions: { name: "", value: false, price: 0 },
      //   kilometersOptions: { km: 0, value: false, price: 0 },
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
  const [guaranteeOptions, setGuaranteeOptions] = useState([
    { name: "Caution Basique 3000 EUR", value: true, price: 3000 },
    { name: "Caution réduite à 2500 EUR", value: false, price: 2500 },
  ])
  console.log("car ", car)

  const handleOptionsClick = <T extends keyof FormValues>(
    index: number,
    setOptions: React.Dispatch<React.SetStateAction<FormValues[T][]>>,
    options: FormValues[T][],
    optionName: T,
  ) => {
    console.log("heee")
    const updatedOptions = options.map((option, i) => {
      console.log(option.value)
      if (i === index) {
        return { ...option, value: true }
      } else {
        return { ...option, value: false }
      }
    })
    setOptions(updatedOptions)
    setValue(optionName as any, updatedOptions[index] as any)
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
          {/* <SearchDatePicker
            control={control}
            startDate={startDate}
            endDate={endDate}
            classes={classes}
          /> */}
        </div>
        <div className="flex flex-wrap w-full bg-black px-6 pb-6 text-white">
          <p className="py-2">OPTIONS DE PAIEMENT</p>
          <hr className="w-full" />
          <div>
            {/* {paymentOptions.map((option, index) => (
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
                    alt={option.value ? "Checked button" : "Unchecked button"}
                    width={24}
                    height={24}
                    className="relative z-10"
                  />
                </span>
              </span>
              <span className="ml-2">{option.name}</span>
            </label>
          ))} */}
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
              //   setOptions={setGuaranteeOptions}
              optionName="guaranteeOptions"
              options={guaranteeOptions}
            />
          </div>
        </div>
        <div className="flex flex-wrap w-full bg-black px-6 pb-6 text-white">
          <p className="py-2">KILOMETRES INCLUS :</p>
          <hr className="w-full" />
          <div>
            {/* {kilometersOptions.map((option, index) => (
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
                    alt={option.value ? "Checked button" : "Unchecked button"}
                    width={24}
                    height={24}
                    className="relative z-10"
                  />
                </span>
              </span>
              <span className="ml-2">{option.km} km</span>
            </label>
          ))} */}
          </div>
        </div>
        <div className="w-full bg-black px-6 pb-6 text-white">
          <p className="py-2">KILOMETRES SUPPLÉMENTAIRES</p>
          <hr className="w-full mb-6" />
          {/* <FixedSlider
          control={control}
          moreKilometersOptions={moreKilometersOptions}
          onInputSliderChange={handleInputSliderChange}
        /> */}
        </div>
        <div className="w-full bg-black px-6 pb-6 text-white">
          <p className="py-2">KILOMETRES SUPPLÉMENTAIRES</p>
          <hr className="w-full" />
        </div>
      </form>
    </>
  )
}

export default RentCarForm
