"use client"
import { Car } from "@/app/firebase/types"
import { SearchFormSchema } from "@/lib/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import "react-datepicker/dist/react-datepicker.css"
import { useForm } from "react-hook-form"
import { z } from "zod"
import SearchCity from "./citySearch"
import SearchDatePicker from "./datesSearch"

type FormValues = z.infer<typeof SearchFormSchema>

interface Props {
  getCars?: Car[]
  onInputChange: (value: string) => void
  allCities: string[]
}

const SearchCarsListForm: React.FC<Props> = ({
  getCars,
  onInputChange,
  allCities,
}: Props) => {
  const {
    register,
    setValue,
    control,
    handleSubmit,
    watch,
    formState,
    formState: { isValidating },
  } = useForm<FormValues>({
    resolver: zodResolver(SearchFormSchema),
  })
  const [startDate, setStartDate] = useState(new Date())
  const initialEndDate = new Date()
  initialEndDate.setDate(initialEndDate.getDate() + 2)
  const [endDate, setEndDate] = useState(initialEndDate)
  const onSubmit = (data: FormValues) => console.log(data)
  const data = watch()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (formState.isValid && !isValidating) {
      console.log(data)
    }
  }, [formState, data, isValidating])

  return (
    <div className="bg-black">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="container sm:max-md:pt-6 md:flex md:justify-between pb-6"
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
        <SearchCity
          onInputChange={onInputChange}
          register={register}
          inputRef={inputRef}
          setValue={setValue}
          getCars={getCars}
          allCities={allCities}
        />
        <SearchDatePicker
          control={control}
          startDate={startDate}
          endDate={endDate}
        />
      </form>
    </div>
  )
}

export default SearchCarsListForm
