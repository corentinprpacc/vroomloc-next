import React from "react"

interface SelectInputProps {
  options: string[]
  label: string
  field: any
}

const SelectInput: React.FC<SelectInputProps> = ({ options, field, label }) => {
  return (
    <div className="flex flex-col gap-2">
      <label>{label}</label>
      <select {...field} className="border">
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

export default SelectInput
