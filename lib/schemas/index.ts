import { z } from "zod"

export const AddCarFormSchema = z.object({
  carId: z.string().min(1, { message: "Veuillez saisir un carId correct" }),
  brand: z.string().min(1, { message: "Veuillez saisir un model" }),
  model: z.string().min(1, { message: "Veuillez saisir un carId correct" }),
  imageUrl: z.string().min(1, { message: "Veuillez saisir une image" }),
  carYear: z.string().min(1, { message: "Veuillez saisir une année correct" }),
  dayPrice: z.string().min(1, { message: "Veuillez saisir un tarif jour" }),
  weekPrice: z.string().min(1, { message: "Veuillez saisir un tarif semaine" }),
  weekEndPrice: z
    .string()
    .min(1, { message: "Veuillez saisir un tarif week end" }),
  horsePower: z.string().min(1, { message: "Veuillez saisir une puissance" }),
  fuelType: z.string().min(1, { message: "Veuillez saisir un carburant" }),
  rentDeposit: z
    .string()
    .min(1, { message: "Veuillez saisir un montant de caution" }),
  kilometerAllowed: z
    .string()
    .min(1, { message: "Veuillez saisir le nombre de kilomètre autorisé" }),
  engineType: z
    .string()
    .min(1, { message: "Veuillez saisir un type de moteur" }),
  description: z
    .string()
    .min(1, { message: "Veuillez saisir une description" }),
  options: z.string().min(1, { message: "Veuillez saisir vos options" }),
  numberOfSeat: z
    .string()
    .min(1, { message: "Veuillez saisir le nombre de place" }),
})

carId: string
brand: string
model: string
imageUrl: string
carYear: string
dayPrice: string
weekPrice: string
weekEndPrice: string
horsePower: string
fuelType: string
rentDeposit: string
kilometerAllowed: string
engineType: string
description: string
options: any
numberOfSeat: string
