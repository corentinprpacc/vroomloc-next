import CardCar from "../../../components/ui/card-car"
import Search from "../../../components/ui/SearchCarsListForm"
import { getAllCars } from "../../firebase/utils"
import { useState, useEffect } from "react"
import { Car } from "../../firebase/types"
import CarsList from "@/components/ui/cars-list"

export default async function Cars() {
  const data = await getAllCars()
  return (
    <>
      <CarsList />
    </>
  )
}
