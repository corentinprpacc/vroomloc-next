"use client"
import Image from "next/image"
import { Controller, useForm, SubmitHandler } from "react-hook-form"
import { useState, useEffect, useRef } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { Car } from "../firebase/types"
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
  const [cities, setCities] = useState<string[]>([])
  const [cityInput, setCityInput] = useState("")
  const [showCities, setShowCities] = useState(false)
  const [filteredCities, setFilteredCities] = useState<string[]>([])
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const onSubmit = (data: FormValues) => console.log(data)
  const data = watch()
  const inputRef = useRef<HTMLInputElement>(null)

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

  useEffect(() => {
    setFilteredCities(cities)
  }, [cities])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setShowCities(false)
      }
    }

    document.addEventListener("click", handleClickOutside)

    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    setCityInput(inputValue)
    onInputChange(inputValue)
    setFilteredCities(
      cities.filter((city) =>
        city.toLowerCase().includes(inputValue.toLowerCase()),
      ),
    )
  }

  const handleInputClick = () => {
    setShowCities(true)
  }

  const handleSuggestionClick = (city: string) => {
    setCityInput(city)
    setShowCities(false)
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
            ref={inputRef}
            onChange={handleInputChange}
            onClick={handleInputClick}
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
          <Image
            src="/images/icons/arrow-down-icon.svg"
            alt="arrow"
            width={16}
            height={16}
            className={`absolute right-4 top-5 text-[#757575] ${showCities ? "rotate-180" : ""}`}
            onClick={handleInputClick}
          />
          {showCities && (
            <ul className="absolute bg-black opacity-85 w-full text-white px-4 pt-4 top-16 z-10">
              {filteredCities.map((city, index) => (
                <li
                  key={index}
                  className="pb-4"
                  onClick={() => handleSuggestionClick(city)}
                >
                  {city}
                </li>
              ))}
            </ul>
          )}
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
