"use client"

import TabMenu from "@/components/ui/TabMenu"
import { ArrowLeftIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
const UpdateCarDetailsLayout = ({
  params: { carId },
  children,
}: {
  params: { carId: string }
  children: React.ReactNode
}) => {
  const Links = [
    {
      href: `/agency/updateCarDetails/${carId}/general-information`,
      label: "Informations générales",
    },
    {
      href: `/agency/updateCarDetails/${carId}/update-image`,
      label: "Image",
    },
  ]

  return (
    <div className="bg-black text-white">
      <div className="flex justify-between items-center pl-2 pr-2 sticky top-0 z-20 bg-black h-20">
        <p className=" hover:cursor-pointer">
          <Link href={"/agency/myCars"}>
            <ArrowLeftIcon className="h-6 w-6 text-white" />
          </Link>
        </p>
        <h1 className="text-4xl font-bold bg-black text-center text-white">
          Modifications véhicule
        </h1>
        <div></div>
      </div>
      <div className="ml-8 sticky bg-black pt-6 pb-6 md:pt-0 top-20 z-20">
        <TabMenu links={Links} />
      </div>
      {children}
    </div>
  )
}

export default UpdateCarDetailsLayout
