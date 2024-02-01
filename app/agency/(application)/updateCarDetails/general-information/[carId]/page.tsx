"use client"

import UpdateCarForm from "@/components/ui/UpdateCarForm"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
type GeneralCarInformationPageProps = {
  params: {
    carId: string
  }
}
export default function GeneralCarInformationPage({
  params: { carId },
}: GeneralCarInformationPageProps) {
  const [currentCarImage, setCurrentCarImage] = useState()
  const pathname = usePathname()

  return (
    <div>
      <ul className="ml-8 text-white flex gap-4 sticky bg-black pt-6 pb-6 md:pt-0 top-20 z-20">
        <li
          className={`text-lg transition-all duration-500 border-b border-b-transparent hover:text-gray-300 ${
            pathname === `/agency/updateCarDetails/general-information/${carId}`
              ? "border-b-white"
              : ""
          }`}
        >
          <Link
            href={{
              pathname: `/agency/updateCarDetails/general-information/${carId}`,
            }}
          >
            Informations générales
          </Link>
        </li>
        <li
          className={`text-lg transition-all duration-500 border-b border-b-transparent hover:text-gray-300 ${
            pathname === `agency/updateCarDetails/update-image/${carId}`
              ? "border-b-white"
              : ""
          }`}
        >
          <Link
            href={{
              pathname: `/agency/updateCarDetails/update-image/${carId}`,
            }}
          >
            Image
          </Link>
        </li>
      </ul>
      <UpdateCarForm carId={carId} />
    </div>
  )
}
