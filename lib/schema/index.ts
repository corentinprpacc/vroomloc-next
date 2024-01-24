import { z } from "zod"

export const LoginFormSchema = z.object({
  email: z
    .string()
    .email("Veuillez saisir une adresse mail valide")
    .min(1, { message: "Veuillez saisir une adresse mail" }),
  password: z
    .string()
    .min(1, { message: "Veuillez saisir un mot de passe" })
    .min(6, { message: "Le mot de passe doit contenir au moins 6 caractères" }),
})

const phoneRegex = /^(?:(?:\+|00)33|0)(?:(?:(?:(\d{2}\s?){4}\d{2})|(\d{9})))$/
const postalCodeRegex = /^(?!0{2})\d{5}$/

export const MoreInfosFormSchema = z.object({
  companyName: z
    .string()
    .min(1, { message: "Veuillez saisir un nom d'agence" }),
  city: z.string().min(1, { message: "Veuillez saisir la ville de l'agence" }),
  street: z
    .string()
    .min(1, { message: "Veuillez saisir l'adresse de l'agence" }),
  postalCode: z
    .string()
    .min(1, { message: "Veuillez saisir le code postal de l'agence" })
    .regex(postalCodeRegex, "Veuillez saisir un code postal valide"),
  phoneNumber: z
    .string()
    .min(1, { message: "Veuillez saisir le numéro de tel. de l'agence" })
    .regex(phoneRegex, "Veuillez saisir un numéro de téléphone valide"),
})

export const RegisterFormSchema = MoreInfosFormSchema.and(LoginFormSchema)
  .and(
    z.object({
      confirmPassword: z
        .string()
        .min(6, "Le mot de passe doit contenir au moins 6 caractères"),
      name: z.string(),
      firstName: z.string(),
    }),
  )
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les deux mots de passe ne sont pas égaux",
    path: ["password"],
  })

export const SearchFormSchema = z.object({
  city: z.string().min(1, { message: "Veuillez saisir la ville de l'agence" }),
  startDate: z.date(),
  endDate: z.date(),
})
