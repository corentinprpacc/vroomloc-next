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

interface InputCheckboxFormProps<T> {
  data: Array<{ name: string; value: boolean; price: number }>
  handleClick: (index: number) => void
}

const InputCheckboxForm = <T extends keyof FormValues>({
  data,
  handleClick,
}: InputCheckboxFormProps<T>) => {
  return (
    <>
      {data.map((option, index) => (
        <label className="inline-flex mr-4 mt-4" key={index}>
          <span
            className="relative inline-flex cursor-pointer"
            onClick={() => handleClick(index)}
          >
            <span className="w-[24px] h-[24px]">
              <Image
                src={
                  option.value
                    ? "/images/icons/checkbox-checked-icon.svg"
                    : "/images/icons/checkbox-unchecked-icon.svg"
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

export default InputCheckboxForm
