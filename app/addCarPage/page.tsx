"use client"
import { DevTool } from "@hookform/devtools"
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { useState } from "react"
import "../firebase/config"
import sendImageToFirebaseStorage from "@/lib/functions/sendImageToFirebaseStorage"
import Input from "@/components/ui/Input"
import SelectInput from "@/components/ui/SelectInput"
import {
  allCarBrand,
  allCarModel,
  carYear,
  carFuel,
  carType,
  carEngine,
} from "@/data"

interface CarModel {
  carId: string
  brand: string
  model: string
  imageUrl: string
  carYear: string
  dayPrice: string
  weekPrice: string
  weekEndPrice: string
  horsePower: string
  fuelType: string
  rentDeposit: string
  kilometerAllowed: string
  engineType: string
  description: string
  options: any
  numberOfSeat: string
}
const AddCarPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CarModel>({
    defaultValues: {
      carId: "azerty123456",
      brand: "Audi",
      imageUrl: "",
    },
  })

  const [image, setImage] = useState(null)

  const handleImageChange = async (e: any) => {
    if (e.target.files.length > 0) {
      const selectedImage = e.target.files[0]
      const imageUrl = await sendImageToFirebaseStorage(selectedImage)

      if (imageUrl) {
        setValue("imageUrl", imageUrl)
      }
    }
  }

  const onSubmit: SubmitHandler<CarModel> = async (data) => {
    console.log("form data", data)
  }

  const watchForm = watch()
  console.log(watchForm)

  const carBrand = watch("brand")
  console.log("carbraaaand", carBrand)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-2 justify-center items-center bg-red-100">
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
            <SelectInput label="Brand" field={field} options={allCarBrand} />
          )}
        />
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
            <SelectInput
              label="Model"
              field={field}
              options={allCarModel[carBrand]}
            />
          )}
        />

        <input
          type="file"
          className="h-8 w-48 bg-green-300"
          placeholder="photo"
          {...register("imageUrl")}
          onChange={handleImageChange}
        />

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
            <SelectInput label="Car Year" field={field} options={carYear} />
          )}
        />
        <Controller
          name="dayPrice"
          control={control}
          defaultValue=""
          rules={{
            required: {
              value: true,
              message: "Ce champs est requis",
            },
          }}
          render={({ field }) => (
            <Input
              maxLength="4"
              label="day price"
              field={field}
              errors={errors}
            />
          )}
        />
        <Controller
          name="weekPrice"
          control={control}
          defaultValue=""
          rules={{
            required: {
              value: true,
              message: "Ce champs est requis",
            },
          }}
          render={({ field }) => (
            <Input
              errors={errors}
              maxLength="4"
              label="week price"
              field={field}
            />
          )}
        />
        <Controller
          name="weekEndPrice"
          control={control}
          defaultValue=""
          rules={{
            required: {
              value: true,
              message: "Ce champs est requis",
            },
          }}
          render={({ field }) => (
            <Input
              errors={errors}
              maxLength="4"
              label="week end price"
              field={field}
            />
          )}
        />
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
            <SelectInput label="Fuel type" field={field} options={carFuel} />
          )}
        />
        <Controller
          name="horsePower"
          control={control}
          defaultValue=""
          rules={{
            required: {
              value: true,
              message: "Ce champs est requis",
            },
          }}
          render={({ field }) => (
            <Input
              errors={errors}
              maxLength="4"
              label="horsepower"
              field={field}
            />
          )}
        />
        <Controller
          name="rentDeposit"
          control={control}
          defaultValue=""
          rules={{
            required: {
              value: true,
              message: "Ce champs est requis",
            },
          }}
          render={({ field }) => (
            <Input
              errors={errors}
              maxLength="4"
              label="rentDeposit"
              field={field}
            />
          )}
        />
        <Controller
          name="kilometerAllowed"
          control={control}
          defaultValue=""
          rules={{
            required: {
              value: true,
              message: "Ce champs est requis",
            },
          }}
          render={({ field }) => (
            <Input
              errors={errors}
              maxLength="4"
              label="kilometer allowed"
              field={field}
            />
          )}
        />
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
            <SelectInput
              label="engine type"
              field={field}
              options={carEngine}
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          defaultValue=""
          rules={{
            required: {
              value: true,
              message: "Ce champs est requis",
            },
          }}
          render={({ field }) => (
            <Input
              errors={errors}
              maxLength="4"
              label="Description"
              field={field}
            />
          )}
        />
        <Controller
          name="options"
          control={control}
          defaultValue=""
          rules={{
            required: {
              value: true,
              message: "Ce champs est requis",
            },
          }}
          render={({ field }) => (
            <Input
              errors={errors}
              maxLength="12"
              label="Options"
              field={field}
            />
          )}
        />
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
            <SelectInput label="Brand" field={field} options={["4", "2"]} />
          )}
        />
        <div>
          <button type="submit">Envoyer</button>
        </div>
      </div>
    </form>
  )
}

export default AddCarPage
