import Image from "next/image"
import { useState, useEffect } from "react"
import { Car } from "@/app/firebase/types"
import { useSearchParams } from "next/navigation"

interface InputProps {
  register: any
  inputRef: React.RefObject<HTMLInputElement>
  setValue: any
  getCars?: Car[]
  onInputChange: (value: string) => void
  allCities: string[]
}

const SearchCity: React.FC<InputProps> = ({
  register,
  inputRef,
  setValue,
  onInputChange,
  allCities,
}) => {
  const searchParams = useSearchParams()
  const citySearchParams = searchParams.get("city")
  const [showCities, setShowCities] = useState(false)
  const [cities, setCities] = useState<string[]>(allCities)
  const [cityInput, setCityInput] = useState(citySearchParams || "")

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
  }, [inputRef])

  const handleInputClick = () => {
    setShowCities(true)
  }

  const handleInputChange = (inputValue: string) => {
    setValue("city", inputValue)
    setCityInput(inputValue)
    onInputChange(inputValue)
  }

  const handleRemoveSearch = () => {
    setValue("city", "")
    setCityInput("")
    onInputChange("")
  }

  return (
    <div className="mt-6 md:w-1/2 border border-solid border-white/50 hover:border-white relative">
      <input
        {...register("city", { required: false })}
        placeholder="Recherchez votre ville..."
        type="text"
        list="cars"
        className="w-full bg-black text-[#c2c2c2] p-4"
        value={cityInput}
        ref={inputRef}
        onChange={(e) => handleInputChange(e.target.value)}
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
          />
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
          {cities.map((city, index) => (
            <li
              key={index}
              className="pb-4"
              onClick={() => handleInputChange(city)}
            >
              {city}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SearchCity
