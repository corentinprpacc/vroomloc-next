"use client"

import { AddCarFormSchema } from "@/lib/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"
type FormType = z.infer<typeof AddCarFormSchema>
export default function UpdateImagePage({
  searchParams,
}: {
  searchParams: FormType
}) {
  const pathname = usePathname()

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitted },
  } = useForm<FormType>({
    resolver: zodResolver(AddCarFormSchema),
    defaultValues: {},
  })

  return (
    <div className="ml-8 mt-8 h-screen">
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
            pathname === "/agency/updateCarDetails/update-image"
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
      <div className="bg-green-400 flex flex-col items-center">
        <Image
          src={searchParams.imageUrl}
          alt="car"
          width="384"
          height="300"
          sizes="100vw"
          className="w-96 h-[300px]"
        />
      </div>
    </div>
  )
}
