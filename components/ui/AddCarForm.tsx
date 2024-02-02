"use client"

import Loader from "@/components/ui/Loader"
import { Input } from "@/components/ui/input"
import { SelectScrollable } from "@/components/ui/selectScrollable"
import {
  allCarBrand,
  allCarModel,
  carEngine,
  carFuel,
  numberOfSeat,
} from "@/data"
import { addNewCar } from "@/lib/actions"
import sendImageToFirebaseStorage from "@/lib/functions/sendImageToFirebaseStorage"
import { AddCarFormSchema } from "@/lib/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "./button"

type FormType = z.infer<typeof AddCarFormSchema>
type AddCarFormProps = {
  currentUserId: string
}

function AddCarForm({ currentUserId }: AddCarFormProps) {
  const [carImageUrl, setCarImageUrl] = useState("")
  const [isFormSubmitting, setIsFormSubmitting] = useState(false)
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitted },
  } = useForm<FormType>({
    resolver: zodResolver(AddCarFormSchema),
    defaultValues: {
      userId: currentUserId,
    },
  })

  const brandField = watch("brand")

  const proccessForm: SubmitHandler<FormType> = async (data) => {
    setIsFormSubmitting(true)
    const dataSent = { ...data, imageUrl: carImageUrl }

    await addNewCar(dataSent)
    setIsFormSubmitting(false)
  }

  const handleImageChange = async (e: any) => {
    if (e.target.files.length > 0) {
      const selectedImage = e.target.files[0]
      const imageUrl = await sendImageToFirebaseStorage(selectedImage)

      if (imageUrl) {
        setCarImageUrl(imageUrl)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(proccessForm)}>
      <div>
        <div className="flex justify-center">
          <div className="w-[280px] mb-4">
            <Controller
              name="imageUrl"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Ce champs est requis",
                },
              }}
              render={({ field }) => (
                <Input
                  id="picture"
                  type="file"
                  required
                  className="bg-gray-500 text-white"
                  {...field}
                  onChange={handleImageChange}
                />
              )}
            />
          </div>
        </div>
        <div className=" flex justify-center">
          <div className="w-[300px] sm:w-[600px] flex flex-wrap justify-center sm:justify-between space-y-2">
            <div className="mt-2">
              <span>Marque</span>
              <Controller
                name="brand"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Ce champs est requis",
                  },
                }}
                render={({ field }) => (
                  <SelectScrollable
                    field={field}
                    placeholder="Marques"
                    options={allCarBrand}
                  />
                )}
              />
              <span className="bg-red-800">{errors.brand?.message}</span>
            </div>
            <div>
              <span>Model</span>
              <Controller
                name="model"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Ce champs est requis",
                  },
                }}
                render={({ field }) => (
                  <SelectScrollable
                    field={field}
                    disabled={brandField ? false : true}
                    placeholder="model"
                    options={brandField ? allCarModel[brandField] : allCarBrand}
                  />
                )}
              />
              <span className="bg-red-800">{errors.model?.message}</span>
            </div>
            <div>
              <span>Année du véhicule</span>
              <Controller
                name="carYear"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Ce champs est requis",
                  },
                }}
                render={({ field }) => (
                  <SelectScrollable
                    field={field}
                    placeholder="Année du véhicule"
                    options={["2024", "2023", "2022", "2021", "2020"]}
                  />
                )}
              />
              <span>{errors.carYear?.message}</span>
            </div>
            <div>
              <span>Carburant</span>
              <Controller
                name="fuelType"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Ce champs est requis",
                  },
                }}
                render={({ field }) => (
                  <SelectScrollable
                    field={field}
                    placeholder="Carburant"
                    options={carFuel}
                  />
                )}
              />
              <span className="bg-red-800">{errors.fuelType?.message}</span>
            </div>
            <div>
              <span>Moteur</span>
              <Controller
                name="engineType"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Ce champs est requis",
                  },
                }}
                render={({ field }) => (
                  <SelectScrollable
                    field={field}
                    placeholder="Moteur"
                    options={carEngine}
                  />
                )}
              />
              <span className="bg-red-800">{errors.engineType?.message}</span>
            </div>
            <div>
              <span>Nombre de places</span>
              <Controller
                name="numberOfSeat"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Ce champs est requis",
                  },
                }}
                render={({ field }) => (
                  <SelectScrollable
                    field={field}
                    placeholder="Nombre de places"
                    options={numberOfSeat}
                  />
                )}
              />
              <span className="bg-red-800">{errors.numberOfSeat?.message}</span>
            </div>

            <div className="w-[280px]">
              <span>Tarif journée</span>
              <Input
                {...register("dayPrice", {
                  valueAsNumber: true,
                })}
                className="bg-black text-white"
                type="number"
                required
                placeholder="Tarif jour"
                onChange={(e) => {
                  const numberField = e.target.value

                  if (numberField.length < 7) {
                    setValue("dayPrice", parseFloat(numberField))
                  } else {
                    setValue("dayPrice", parseFloat(numberField.slice(0, -1)))
                  }
                }}
              />
              <span className="bg-red-800">{errors.dayPrice?.message}</span>
            </div>
            <div className="w-[280px]">
              <span>Tarif semaine</span>
              <Input
                {...register("weekPrice", {
                  valueAsNumber: true,
                })}
                className="bg-black text-white"
                type="number"
                required
                placeholder="Tarif semaine"
                onChange={(e) => {
                  const numberField = e.target.value

                  if (numberField.length < 7) {
                    setValue("weekPrice", parseFloat(numberField))
                  } else {
                    setValue("weekPrice", parseFloat(numberField.slice(0, -1)))
                  }
                }}
              />
              <span className="bg-red-800">{errors.weekPrice?.message}</span>
            </div>
            <div className="w-[280px]">
              <span>Tarif week-end</span>
              <Input
                {...register("weekEndPrice", {
                  valueAsNumber: true,
                })}
                className="bg-black text-white"
                type="number"
                placeholder="Tarif weekend"
                required
                onChange={(e) => {
                  const numberField = e.target.value

                  if (numberField.length < 7) {
                    setValue("weekEndPrice", parseFloat(numberField))
                  } else {
                    setValue(
                      "weekEndPrice",
                      parseFloat(numberField.slice(0, -1)),
                    )
                  }
                }}
              />
              <span className="bg-red-800">{errors.weekEndPrice?.message}</span>
            </div>
            <div className="w-[280px]">
              <span>Puissance (CH)</span>
              <Input
                {...register("horsePower", {
                  valueAsNumber: true,
                })}
                className="bg-black text-white"
                type="number"
                placeholder="Puissance CH"
                required
                onChange={(e) => {
                  const numberField = e.target.value

                  if (numberField.length < 7) {
                    setValue("horsePower", parseInt(numberField))
                  } else {
                    setValue("horsePower", parseInt(numberField.slice(0, -1)))
                  }
                }}
              />
              <span className="bg-red-800">{errors.horsePower?.message}</span>
            </div>
            <div className="w-[280px]">
              <span>Montant caution</span>
              <Input
                {...register("rentDeposit", {
                  valueAsNumber: true,
                })}
                className="bg-black text-white"
                type="number"
                placeholder="Montant de la caution"
                required
                onChange={(e) => {
                  const numberField = e.target.value

                  if (numberField.length < 7) {
                    setValue("rentDeposit", parseInt(numberField))
                  } else {
                    setValue("rentDeposit", parseInt(numberField.slice(0, -1)))
                  }
                }}
              />
              <span className="bg-red-800">{errors.rentDeposit?.message}</span>
            </div>
            <div className="w-[280px]">
              <span>Kilomètres autorisés</span>
              <Input
                {...register("kilometerAllowed", {
                  valueAsNumber: true,
                })}
                className="bg-black text-white"
                type="number"
                placeholder="Kilomètres autorisés"
                onChange={(e) => {
                  const numberField = e.target.value

                  if (numberField.length < 7) {
                    setValue("kilometerAllowed", parseInt(numberField))
                  } else {
                    setValue(
                      "kilometerAllowed",
                      parseInt(numberField.slice(0, -1)),
                    )
                  }
                }}
              />
              <span className="bg-red-800">
                {errors.kilometerAllowed?.message}
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-[300px] sm:w-[600px] mt-4">
            <span className="text-white">Description</span>
            <Input
              {...register("description")}
              className="bg-black text-white h-48"
              type="text"
              placeholder="..."
              required
              maxLength={100}
            />
            <span className="bg-red-800">{errors.description?.message}</span>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-4 pb-4">
        <Button variant="outline" className="mt-2 w-48 text-black">
          {isFormSubmitting ? (
            <Loader className="h-8" />
          ) : (
            <span className="text-white-700"> Ajouter</span>
          )}
        </Button>
      </div>
    </form>
  )
}

export default AddCarForm
