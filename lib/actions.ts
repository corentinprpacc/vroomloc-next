"use server"

import {
  getUpdateUserDataByEmail,
  getUserByEmail,
  getUserRefByEmail,
} from "@/app/firebase/utils"
import { auth, signIn, signOut } from "@/auth"
import { addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore"
import { AuthError } from "next-auth"
import { redirect } from "next/navigation"
import { z } from "zod"
import {
  LoginFormSchema,
  MoreInfosFormSchema,
  RegisterFormSchema,
  UpdateEmailSchema,
  UpdatePasswordSchema,
  UpdateProfileFormSchema,
  SearchFormSchema,
} from "./schema"
import {
  updateUserDataCollection,
  usersCollection,
} from "@/app/firebase/collections"
import * as bcrypt from "bcryptjs"
import { db } from "@/app/firebase/config"

type InputsLogin = z.infer<typeof LoginFormSchema>

type InputRegister = z.infer<typeof RegisterFormSchema>

type InputEditProfile = z.infer<typeof UpdateProfileFormSchema>

type InputMoreInfos = z.infer<typeof MoreInfosFormSchema>

type InputSearch = z.infer<typeof SearchFormSchema>

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

export async function updateUserGlobalInfos(
  userId: string,
  data: InputEditProfile,
) {
  console.log("User Id: ", userId)
  console.log("Data in Action: ", data)
  const result = UpdateProfileFormSchema.safeParse(data)
  if (result.success) {
    // TODO Update User in Firebase
    const userRef = doc(db, "users", userId)
    if (userRef) {
      await updateDoc(userRef, { ...data })
      console.log("Informations successfully updated")
    }
  } else {
    return { message: "Invalid Data" }
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

export async function updateUserEmail(data: { email: string }) {
  const result = UpdateEmailSchema.safeParse(data)
  const session = await auth()
  if (result.success) {
    // TODO Update User in Firebase
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

export async function updateUserPassword(data: {
  password: string
  confirmPassword: string
}) {
  const result = UpdatePasswordSchema.safeParse(data)
  const session = await auth()
  if (result.success) {
    // TODO Update User in Firebase
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

export async function searchForm(data: InputSearch) {
  const result = SearchFormSchema.safeParse(data)
  if (result.success) {
    // doing something
  } else {
    return false
  }
}
