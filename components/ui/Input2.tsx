import isThisStringContainOnlyNumbers from "@/lib/functions/isThisStringContainOnlyNumbers"
import React from "react"

interface InputProps {
  field: any
  label: string
  maxLength: string
  errors: any
}

const Input2: React.FC<InputProps> = ({ field, label, maxLength, errors }) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={field.name}>{label}</label>
      <input
        maxLength={maxLength}
        {...field}
        type="text"
        className="border"
        placeholder={label}
        onChange={(e) => {
          if (e.target.value) {
            const contientUniquementNombres = isThisStringContainOnlyNumbers(
              e.target.value,
            )

            if (contientUniquementNombres) {
              field.onChange(e.target.value)
            }
          } else {
            field.onChange(undefined)
          }
        }}
      />
      {errors[field.name] && (
        <p className="text-red-400">{errors[field.name]?.message}</p>
      )}
    </div>
  )
}

export default Input2
