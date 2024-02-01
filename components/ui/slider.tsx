"use client"
import React from "react"
import Slider from "rc-slider"
import "rc-slider/assets/index.css"
import { Controller } from "react-hook-form"
import { useState } from "react"

const marks = {
  0: "0",
  100: "100",
  200: "200",
  300: "300",
  400: "400",
  500: "500",
}

interface SliderProps {
  control: any
  onInputSliderChange: (value: number) => void
}

const FixedSlider: React.FC<SliderProps> = ({
  control,
  onInputSliderChange,
}) => {
  const min = 0
  const max = 500
  const [maxValue, setMaxValue] = useState<number>(0)

  const handleChange = (value: number | number[]) => {
    setMaxValue(value as number)
    onInputSliderChange(value as number)
  }

  return (
    <div>
      <p className="text-right mb-2">{maxValue} km</p>
      <Controller
        name="maxValue"
        control={control}
        defaultValue={maxValue}
        render={({ field: { onChange, value } }) => (
          <Slider
            min={0}
            max={500}
            range={false}
            marks={marks}
            step={null}
            dots
            onChange={handleChange}
            // value={value}
          />
        )}
      />
    </div>
  )
}

export default FixedSlider
