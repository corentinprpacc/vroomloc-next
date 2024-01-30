"use client"

import UpdateCarForm from "@/components/ui/UpdateCarForm"
import { AddCarFormSchema } from "@/lib/schema"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { z } from "zod"
type FormType = z.infer<typeof AddCarFormSchema>
export default function GeneralCarInformationPage({
  searchParams,
}: {
  searchParams: FormType
}) {
  const pathname = usePathname()

  return (
    <div className="ml-8 mt-8">
      <ul className="text-white flex gap-4">
        <li
          className={`text-lg transition-all duration-500 border-b border-b-transparent hover:text-gray-300 ${
            pathname === "/agency/updateCarDetails/general-information"
              ? "border-b-white"
              : ""
          }`}
        >
          <Link
            href={{
              pathname: "/agency/updateCarDetails/general-information",
              query: searchParams,
            }}
          >
            Informations générales
          </Link>
        </li>
        <li
          className={`text-lg transition-all duration-500 border-b border-b-transparent hover:text-gray-300 ${
            pathname === "agency/updateCarDetails/update-image"
              ? "border-b-white"
              : ""
          }`}
        >
          <Link
            href={{
              pathname: "/agency/updateCarDetails/update-image",
              query: searchParams,
            }}
          >
            Image
          </Link>
        </li>
      </ul>
      <UpdateCarForm carDatas={searchParams} />
    </div>
  )
}
