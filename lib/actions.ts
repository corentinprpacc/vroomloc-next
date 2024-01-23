"use server"

import {
  carsCollection,
  carsTargetedDocument,
  userTargetedDocument,
  usersCollection,
} from "@/app/firebase/collections"
import { getUserRefByEmail } from "@/app/firebase/utils"
import { auth, signIn, signOut } from "@/auth"
import * as bcrypt from "bcryptjs"
import { addDoc, updateDoc } from "firebase/firestore"
import { AuthError } from "next-auth"
import { redirect } from "next/navigation"
import { z } from "zod"
import {
  AddCarFormSchema,
  LoginFormSchema,
  MoreInfosFormSchema,
  RegisterFormSchema,
} from "./schema"

type InputsLogin = z.infer<typeof LoginFormSchema>

type InputRegister = z.infer<typeof RegisterFormSchema>

type InputMoreInfos = z.infer<typeof MoreInfosFormSchema>

type AddCarFormType = z.infer<typeof AddCarFormSchema>

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
    const response = await addDoc(carsCollection, {
      ...data,
      carId: "789",
    })

    await updateDoc(carsTargetedDocument(response.id), {
      carId: response.id,
    })

    return true
  } else {
    return false
  }
}
