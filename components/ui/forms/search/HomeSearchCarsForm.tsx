"use client"

import { SearchFormSchema } from "@/lib/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import "react-datepicker/dist/react-datepicker.css"
import { z } from "zod"
import DatePicker from "react-datepicker"
import { useState } from "react"
import { Button } from "../../button"
import { searchForm } from "@/lib/actions"

type FormSearch = z.infer<typeof SearchFormSchema>

export default function HomeSearchCarsForm() {
  const { handleSubmit, register, control, watch } = useForm<FormSearch>({
    resolver: zodResolver(SearchFormSchema),
  })
  const [startDate, setStartDate] = useState(new Date())
  const date = new Date()
  date.setDate(date.getDate() + 3)
  const [endDate, setEndDate] = useState(date)
  const processForm = async (data: FormSearch) => {
    await searchForm(data)
  }
  const formWatch = watch()
  const isDisabled = () => {
    return !(!!formWatch.city && !!formWatch.startDate && !!formWatch.endDate)
  }
  return (
    <form
      className="flex flex-col items-center mt-2 w-full"
      onSubmit={handleSubmit(processForm)}
    >
      <div className="flex-1 flex flex-col lg:w-3/5 w-full items-center rounded-lg px-6">
        <div className="w-full">
          <input
            {...register("city", { required: false })}
            placeholder="Recherchez votre ville..."
            type="text"
            className="w-full bg-black text-[#c2c2c2] p-4 border border-solid border-white/50 hover:border-white"
          />
        </div>
        <div className="flex w-full gap-2">
          <div className="relative w-full">
            <label className="absolute z-10 top-4 left-4 px-2 text-[#c2c2c2] text-xs bg-black">
              Départ
            </label>
            <Controller
              name={"startDate"}
              control={control}
              defaultValue={startDate}
              render={({ field }) => (
                <DatePicker
                  selectsStart
                  showTimeSelect
                  selected={field.value}
                  startDate={startDate}
                  onChange={field.onChange}
                  className="w-full md:w-full mt-6 bg-black text-white border border-solid border-white/50 hover:border-white py-4 px-8"
                  dateFormat="dd/MM/yyyy HH:mm"
                />
              )}
            />
          </div>
          <div className="relative w-full">
            <label className="absolute z-10 top-4 left-4 px-2 text-[#c2c2c2] text-xs bg-black">
              Retour
            </label>
            <Controller
              name={"endDate"}
              control={control}
              defaultValue={endDate}
              render={({ field }) => (
                <DatePicker
                  selectsStart
                  showTimeSelect
                  dateFormat="dd/MM/yyyy HH:mm"
                  selected={field.value}
                  startDate={endDate}
                  onChange={field.onChange}
                  className="w-full md:w-full mt-6 bg-black text-white border border-solid border-white/50 hover:border-white py-4 px-8"
                />
              )}
            />
          </div>
        </div>
        <Button
          className={`transition-all duration-300 font-light ${!isDisabled() ? "bg-white text-black hover:bg-black hover:text-white" : "text-[#c2c2c2] bg-black"} py-6 w-full mt-4 text-lg border rounded-none border-white/50 hover:border-white`}
          disabled={isDisabled()}
        >
          RECHERCHER
        </Button>
      </div>
    </form>
  )
}
