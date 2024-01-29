"use client"

import MyCalendarComponent from "@/components/ui/MyCalendarComponent"
import { getCarReservations } from "@/lib/actions"
import { ArrowLeftIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function CarCalendar() {
  const [reservations, setReservations] = useState([{}])
  const searchParams = useSearchParams()

  const carId = searchParams.get("carId")
  const carBrand = searchParams.get("brand")
  const carModel = searchParams.get("model")

  useEffect(() => {
    const getReservations = async () => {
      const reservations = await getCarReservations(carId!)
      setReservations(reservations)
    }

    getReservations()
  }, [carId])

  return (
    <div className="">
      <div className="h-10 bg-black pl-2 pr-2 text-white flex justify-between items-center sticky top-0 z-10">
        <Link href="/agency/myCars">
          <ArrowLeftIcon className="h-6 w-6 text-white" />
        </Link>
        <div className="w-48 flex justify-end font-bold items-center space-x-2">
          <p>{carBrand}</p>
          <p>{carModel}</p>
        </div>
      </div>
      <MyCalendarComponent listOrders={reservations} />
    </div>
  )
}
