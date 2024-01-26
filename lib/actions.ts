"use server"

import {
  carsCollection,
  carsTargetedDocument,
  updateUserDataCollection,
  userTargetedDocument,
  usersCollection,
} from "@/app/firebase/collections"
import { getUserByEmail, getUserRefByEmail } from "@/app/firebase/utils"
import { auth, signIn, signOut } from "@/auth"
import * as bcrypt from "bcryptjs"
import { addDoc, deleteDoc, updateDoc } from "firebase/firestore"
import { AuthError } from "next-auth"
import { redirect } from "next/navigation"
import { z } from "zod"
import {
  AddCarFormSchema,
  LoginFormSchema,
  MoreInfosFormSchema,
  RegisterFormSchema,
} from "./schema"

export type InputsLogin = z.infer<typeof LoginFormSchema>

export type InputRegister = z.infer<typeof RegisterFormSchema>

export type InputMoreInfos = z.infer<typeof MoreInfosFormSchema>

export type AddCarFormType = z.infer<typeof AddCarFormSchema>

export async function authenticate(data: InputsLogin) {
  const result = LoginFormSchema.safeParse(data)
  if (result.success) {
    try {
      await signIn("credentials", result.data)
    } catch (error) {
      if (error instanceof AuthError) {
        return "Invalid Credentials"
      }
      throw error
    }
  } else {
    return "Invalid Credentials"
  }
}

export async function signInWithGoogle() {
  await signIn("google", { callbackUrl: "/" })
}

export async function addMoreInfos(data: InputMoreInfos) {
  const result = MoreInfosFormSchema.safeParse(data)
  if (result.success) {
    const session = await auth()
    const userInDb = await getUserRefByEmail(session?.user.email || "")
    if (userInDb) {
      await updateDoc(userInDb, {
        ...data,
        role: "company",
      })
      await new Promise((resolve) => setTimeout(resolve, 1000))
      redirect("/agency")
    }
  } else {
    return false
  }
}

export async function signOutAction() {
  await signOut()
}

export async function register(data: InputRegister) {
  const result = RegisterFormSchema.safeParse(data)
  if (result.success) {
    // Check if user already exists
    const userInDb = await getUserRefByEmail(result.data.email)
    if (userInDb) {
      return "L'utilisateur existe déjà"
    }
    // Add the user to the database and sign in
    const { confirmPassword, password, ...userData } = result.data
    // Encrypt password
    const passwordCrypt = (await bcrypt.hash(data.password, 10)) as string
    const response = await addDoc(usersCollection, {
      ...userData,
      password: passwordCrypt,
      role: "company",
    })
    await updateDoc(userTargetedDocument(response.id), {
      id: response.id,
    })

    await signIn("credentials", {
      email: userData.email,
      password,
    })
  } else {
    return false
  }
}

export async function addNewCar(data: AddCarFormType) {
  const result = AddCarFormSchema.safeParse(data)

  if (result.success) {
    const carAdded = await addDoc(carsCollection, {
      ...data,
    })

    await updateDoc(carAdded, {
      carId: carAdded.id,
    })

    redirect("/agency/myCars")
  } else {
    return false
  }
}
export async function updateCarInfos(
  data: AddCarFormType,
  carId: string,
  carImage: string,
) {
  console.log("caar id", carId)
  const result = AddCarFormSchema.safeParse(data)
  if (result.success) {
    await updateDoc(carsTargetedDocument(carId), {
      ...data,
      imageUrl: carImage,
    })

    redirect("/agency/myCars")
  } else {
    return false
  }
}

export async function confirmSecurityPassword(data: {
  password: string
}): Promise<{ type: string; message: string }> {
  const session = await auth()
  const user = await getUserByEmail(session?.user.email || "")
  if (!user) return { message: "User not logged in!", type: "error" }
  const passwordsMatch = await bcrypt.compare(data.password, user.password)
  if (!passwordsMatch) return { message: "Incorrect Password.", type: "error" }
  let currentDate = new Date()
  currentDate.setMinutes(currentDate.getMinutes() + 5)
  await addDoc(updateUserDataCollection, {
    expiresAt: currentDate,
    email: session?.user.email,
    userId: session?.user.id,
  })
  redirect("/agency/profile/edit/sensitive")
}

export async function deleteCar(carId: string) {
  try {
    console.log("deleted car id", carId)
    await deleteDoc(carsTargetedDocument(carId))

    return true
  } catch (error) {
    console.log("voiture non supprimé", error)

    return false
  }
}
