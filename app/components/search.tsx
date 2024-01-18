"use client"
import Image from "next/image"
import { Controller, useForm, SubmitHandler } from "react-hook-form"
import { useState, useEffect } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { Car } from "../firebase/types"
import Props from "../cars/page"
import { update } from "firebase/database"

type FormValues = {
  city: string
  startDate: any
  endDate: any
}

interface Props {
  getCars?: Car[]
  onInputChange: (value: string) => void
}

const Search: React.FC<Props> = ({ getCars, onInputChange }: Props) => {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState,
    formState: { isValidating },
  } = useForm<FormValues>({
    mode: "onChange",
  })
  const [cars, setCars] = useState<Car[]>()
  const [cities, setCities] = useState<String[]>([])
  const [cityInput, setCityInput] = useState("")
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const onSubmit = (data: FormValues) => console.log(data)
  const data = watch()

  useEffect(() => {
    let updatedCities: string[] = []

    if (getCars) {
      getCars.map((car) => {
        if (!updatedCities.includes(car.city)) {
          updatedCities.push(car.city)
        }
      })
      setCities(updatedCities)
    }
  }, [getCars])

  useEffect(() => {
    if (formState.isValid && !isValidating) {
      console.log(data)
    }
  }, [formState, data, isValidating])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    setCityInput(inputValue)
    onInputChange(inputValue)
  }

  const handleRemoveSearch = () => {
    setCityInput("")
    onInputChange("")
  }

  return (
    <div className="bg-black">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="container sm:max-md:pt-6 md:flex md:justify-between"
      >
        <button className="w-full md:mt-6 md:w-auto text-white flex justify-center border border-solid border-white/50 hover:border-white py-4 px-8">
          <span className="mr-3">
            <Image
              src="/images/icons/filter-icon.svg"
              alt="Filter"
              width={22}
              height={22}
            ></Image>
          </span>
          <span>Filtrer</span>
        </button>
        <div className="mt-6 md:w-1/2 border border-solid border-white/50 hover:border-white relative">
          <input
            {...register("city", { required: false })}
            placeholder="Recherchez votre ville..."
            type="text"
            list="cars"
            className="w-full bg-black text-[#c2c2c2] p-4"
            value={cityInput}
            onChange={handleInputChange}
          />
          {cityInput && (
            <button
              onClick={handleRemoveSearch}
              type="button"
              title="remove search"
              className="absolute right-10 top-5"
            >
              <Image
                src="/images/icons/remove-icon.svg"
                alt="Remove search"
                width={16}
                height={16}
              ></Image>
            </button>
          )}
          <datalist id="cars">
            {cities.map((city, id) => {
              return <option key={id}>{city}</option>
            })}
          </datalist>
        </div>
        <div className="relative z-0">
          <label className="absolute z-10 top-4 left-4 px-2 text-[#c2c2c2] text-xs bg-black">
            Départ
          </label>
          <Controller
            control={control}
            {...register("startDate", { required: false })}
            render={({ field: { onChange } }) => (
              <DatePicker
                selectsStart
                selected={startDate}
                onChange={onChange}
                startDate={startDate}
                className="w-full md:w-auto mt-6 bg-black text-white border border-solid border-white/50 hover:border-white py-4 px-8"
              />
            )}
          />
        </div>
        <div className="relative">
          <label className="absolute z-10 top-4 left-4 px-2 text-[#c2c2c2] text-xs bg-black">
            Retour
          </label>
          <Controller
            control={control}
            {...register("endDate", { required: false })}
            render={({ field }) => (
              <DatePicker
                selectsEnd
                selected={endDate}
                onChange={field.onChange}
                endDate={endDate}
                startDate={startDate}
                minDate={startDate}
                className="w-full md:w-auto mt-6 bg-black text-white border border-solid border-white/50 hover:border-white py-4 px-8"
              />
            )}
          />
        </div>
      </form>
      Search
    </div>
  )
}

export default Search
