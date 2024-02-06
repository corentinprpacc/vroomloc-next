"use client"

import { useFormStatus } from "react-dom"
import { addMoreInfos } from "@/lib/actions"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { z } from "zod"
import { MoreInfosFormSchema } from "@/lib/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import Loader from "./Loader"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { BookFormSchema } from "@/lib/schema"

type FormValues = z.infer<typeof BookFormSchema>

interface InputRadioFormProps<T> {
  data: Array<{ name: string; value: boolean; price?: number; km?: number }>
  handleClick: (
    index: number,
    options: Array<{
      name: string
      value: boolean
      price?: number
      km?: number
    }>,
    optionName: T,
  ) => void
  //   setOptions: React.Dispatch<React.SetStateAction<Option[]>>
  optionName: T
  options: Array<{ name: string; value: boolean; price?: number; km?: number }>
}

const InputRadioForm = <T extends keyof FormValues>({
  data,
  handleClick,
  //   setOptions,
  optionName,
  options,
}: InputRadioFormProps<T>) => {
  return (
    <>
      {data.map((option, index) => (
        <label className="inline-flex mr-4 mt-4" key={index}>
          <span
            className="relative inline-flex cursor-pointer"
            onClick={() => handleClick(index, options, optionName)}
          >
            <span>
              <Image
                src={
                  option.value
                    ? "/images/icons/radio-button-checked-icon.svg"
                    : "/images/icons/radio-button-unchecked-icon.svg"
                }
                alt={option.value ? "Checked button" : "Unchecked button"}
                width={24}
                height={24}
                className="relative z-10"
              />
            </span>
          </span>
          <span className="ml-2">{option.name}</span>
        </label>
      ))}
    </>
  )
}

export default InputRadioForm
