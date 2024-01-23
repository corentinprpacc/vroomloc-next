// DatePickerComponent.js
import React from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { Controller } from "react-hook-form"

interface DatePickerProps {
  control: any
  startDate: Date
  endDate: Date
}

const SearchDatePicker: React.FC<DatePickerProps> = ({
  control,
  startDate,
  endDate,
}) => {
  return (
    <>
      <div className="relative">
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
              selected={field.value}
              startDate={startDate}
              onChange={field.onChange}
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
          name={"endDate"}
          control={control}
          defaultValue={endDate}
          render={({ field }) => (
            <DatePicker
              selectsEnd
              selected={field.value}
              onChange={field.onChange}
              endDate={endDate}
              startDate={startDate}
              minDate={startDate}
              className="w-full md:w-auto mt-6 bg-black text-white border border-solid border-white/50 hover:border-white py-4 px-8"
            />
          )}
        />
      </div>
    </>
  )
}

export default SearchDatePicker
