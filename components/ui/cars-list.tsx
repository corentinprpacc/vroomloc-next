"use client"
import CardCar from "@/components/ui/card-car"
import Search from "@/components/ui/SearchCarsListForm"
import { getAllCars } from "@/app/firebase/utils"
import { useState, useEffect } from "react"
import { Car } from "@/app/firebase/types"
import { query, where, getDocs } from "firebase/firestore"
import { carsCollection } from "@/app/firebase/collections"
import SearchCarsListForm from "@/components/ui/SearchCarsListForm"

export default function CarsList() {
  const [cars, setCars] = useState<Car[]>()
  const [searchCity, setSearchCity] = useState<String>("")

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
      <SearchCarsListForm getCars={cars} onInputChange={handleInputChange} />
      <div className="container relative z-0">
        <p className="text-center my-4">Résultats</p>
        <div className="flex cards-block flex-wrap">
          {cars?.map((car, id) => <CardCar key={id} getCar={car} />)}
        </div>
      </div>
    </>
  )
}
