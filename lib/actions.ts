"use server"

import {
  carsCollection,
  carsTargetedDocument,
  updateUserDataCollection,
  usersCollection,
} from "@/app/firebase/collections"
import { db } from "@/app/firebase/config"
import {
  getUpdateUserDataByEmail,
  getUserByEmail,
  getUserRefByEmail,
} from "@/app/firebase/utils"
import { auth, signIn, signOut } from "@/auth"
import * as bcrypt from "bcryptjs"
import {
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore"
import { AuthError } from "next-auth"
import { unstable_cache } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"
import {
  AddCarFormSchema,
  LoginFormSchema,
  MoreInfosFormSchema,
  RegisterFormSchema,
  SearchFormSchema,
  UpdateEmailSchema,
  UpdatePasswordSchema,
  UpdateProfileFormSchema,
} from "./schema"

type InputsLogin = z.infer<typeof LoginFormSchema>

type InputRegister = z.infer<typeof RegisterFormSchema>

type InputMoreInfos = z.infer<typeof MoreInfosFormSchema>

type AddCarFormType = z.infer<typeof AddCarFormSchema>

type InputSearch = z.infer<typeof SearchFormSchema>

type InputEditProfile = z.infer<typeof UpdateProfileFormSchema>

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
    await addDoc(usersCollection, {
      ...userData,
      password: passwordCrypt,
      role: "company",
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
  console.log("result add car", result)
  if (result.success) {
    const response = await addDoc(carsCollection, {
      ...data,
      carId: "789",
    })

    await updateDoc(carsTargetedDocument(response.id), {
      carId: response.id,
    })
    console.log("respooonse id", response.id)

    return true
  } else {
    return false
  }
}

export async function searchForm(data: InputSearch) {
  const result = SearchFormSchema.safeParse(data)
  if (result.success) {
    const queryParamsCity = `?city=${data.city}`
    const queryParamsDate = `&startDate=${data.startDate.toLocaleDateString()}&endDate=${data.endDate.toLocaleDateString()}`
    const url = `/cars${queryParamsCity}${queryParamsDate}`
    redirect(url)
  } else {
    return false
  }
}

export const getAllCities = unstable_cache(
  async (): Promise<string[]> => {
    const queryCities = query(usersCollection, where("role", "==", "company"))
    const docsSnapshot = await getDocs(queryCities)
    return docsSnapshot.docs.map((doc) => {
      if (doc.data().city) {
        return doc.data().city
      }
    })
  },
  ["cities"],
  { tags: ["cities"] },
)

export async function updateUserPassword(data: {
  password: string
  confirmPassword: string
}) {
  const result = UpdatePasswordSchema.safeParse(data)
  const session = await auth()
  if (result.success) {
    const userExists = await getUserByEmail(session?.user.email || "")
    if (!userExists) return { message: "Erreur..." }
    const userRef = doc(db, "users", session?.user.id || "")
    if (userRef) {
      const passwordCrypt = (await bcrypt.hash(data.password, 10)) as string
      await updateDoc(userRef, { password: passwordCrypt })
    }
  } else {
    return { message: "Les mots de passe ne correspondent pas" }
  }
}

export async function updateUserEmail(data: { email: string }) {
  const result = UpdateEmailSchema.safeParse(data)
  const session = await auth()
  if (result.success) {
    const userExists = await getUserByEmail(data.email)
    const emailAlreadyExists = !!userExists
    if (emailAlreadyExists) {
      if (userExists.id === session?.user.id) {
        return { message: "Cette adresse mail est déjà la vôtre." }
      }
      return {
        message: "Un utilisateur possédant cette adresse mail existe déjà",
      }
    }
    const userRef = doc(db, "users", session?.user.id || "")
    if (userRef) {
      // Delete verification token user
      const updateUserData = await getUpdateUserDataByEmail(
        session?.user.email || "",
      )
      if (updateUserData) await deleteDoc(updateUserData.ref)
      await updateDoc(userRef, { email: data.email })
    }
  } else {
    return { message: "L'adresse mail est invalide." }
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

export async function updateUserGlobalInfos(
  userId: string,
  data: InputEditProfile,
) {
  const result = UpdateProfileFormSchema.safeParse(data)
  if (result.success) {
    const userRef = doc(db, "users", userId)
    if (userRef) {
      await updateDoc(userRef, { ...data })
    }
  } else {
    return { message: "Invalid Data" }
  }
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
