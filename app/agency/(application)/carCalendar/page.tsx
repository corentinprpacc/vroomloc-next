"use client"

import MyCalendarComponent from "@/components/ui/MyCalendarComponent"
import { getCarReservations } from "@/lib/actions"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function CarCalendar() {
  const [reservations, setReservations] = useState([{}])
  const searchParams = useSearchParams()
  useEffect(() => {
    const getReservations = async () => {
      const reservations = await getCarReservations("82AkaYtmIbvs1b98MYwG")
      setReservations(reservations)
    }

    getReservations()
  }, [])

  return (
    <div className="">
      <div className="h-10 bg-black pl-2 pr-2 text-white flex justify-between items-center sticky top-0 z-10">
        <Link href="/agency/myCars">retour</Link>
        <div className="w-48 flex justify-end font-bold items-center space-x-2">
          <p>{searchParams.get("brand")}</p>
          <p>{searchParams.get("model")}</p>
        </div>
      </div>
      <MyCalendarComponent listOrders={reservations} />
    </div>
  )
}
