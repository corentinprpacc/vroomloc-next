"use client"
import React from "react"
import Slider from "rc-slider"
import "rc-slider/assets/index.css"
import { Controller } from "react-hook-form"
import { useState } from "react"

interface KilometerOption {
  km: number
  price: number
}

interface SliderProps {
  control: any
  moreKilometersOptions: KilometerOption[]
  onInputSliderChange: (value: KilometerOption) => void
}

const FixedSlider: React.FC<SliderProps> = ({
  control,
  moreKilometersOptions,
  onInputSliderChange,
}) => {
  const min = 0
  const max = 500
  const [maxValue, setMaxValue] = useState<number>(0)

  const marks: { [key: number]: string } = {}
  moreKilometersOptions.forEach((option) => {
    marks[option.km] = option.km.toString()
  })

  const handleChange = (value: number | number[]) => {
    setMaxValue(value as number)

    const selectedKilometerOption = moreKilometersOptions.find(
      (option) => option.km === value,
    )
    onInputSliderChange(selectedKilometerOption!)
  }

  return (
    <div>
      <p className="text-right mb-2">{maxValue} km</p>
      <Controller
        name="maxValue"
        control={control}
        defaultValue={maxValue}
        render={({ field: { onChange } }) => (
          <Slider
            min={0}
            max={500}
            range={false}
            marks={marks}
            step={null}
            dots
            onChange={handleChange}
          />
        )}
      />
    </div>
  )
}

export default FixedSlider
