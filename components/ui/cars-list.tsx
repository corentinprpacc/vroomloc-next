"use client"
import CardCar from "@/components/ui/card-car"
import { useState, useEffect } from "react"
import { Car } from "@/app/firebase/types"
import { query, where, getDocs } from "firebase/firestore"
import { carsCollection } from "@/app/firebase/collections"
import SearchCarsListForm from "@/components/ui/SearchCarsListForm"
import { useSearchParams } from "next/navigation"

type CarsListProps = {
  allCities: string[]
}

export default function CarsList({ allCities }: CarsListProps) {
  const searchParams = useSearchParams()
  const citySearchParams = searchParams.get("city")
  const startDateSearchParams = searchParams.get("startDate")
  const endDateSearchParams = searchParams.get("endDate")
  const [cars, setCars] = useState<Car[]>()
  const [searchCity, setSearchCity] = useState<String>(citySearchParams || "")

  useEffect(() => {
    async function getCars() {
      let queryCars
      if (searchCity) {
        queryCars = query(carsCollection, where("city", "==", searchCity))
      } else {
        queryCars = query(carsCollection)
      }

      const querySnapshot = await getDocs(queryCars)
      const carsData = querySnapshot.docs.map((doc) => ({
        ...(doc.data() as Car),
      }))
      setCars(carsData)
    }

    getCars()
  }, [searchCity])

  const handleInputChange = (inputValue: string) => {
    setSearchCity(inputValue)
  }

  return (
    <>
      <SearchCarsListForm
        getCars={cars}
        allCities={allCities}
        onInputChange={handleInputChange}
      />
      <div className="container relative z-0">
        <p className="text-center my-4">Résultats</p>
        <div className="flex cards-block flex-wrap">
          {cars?.map((car, id) => <CardCar key={id} getCar={car} />)}
        </div>
      </div>
    </>
  )
}
