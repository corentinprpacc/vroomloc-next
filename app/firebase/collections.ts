import { collection, doc } from "firebase/firestore"
import { db } from "./config"

export const usersCollection = collection(db, "users")
export const carsCollection = collection(db, "cars")
export const ordersCollection = collection(db, "orders")

export const carsTargetedDocument = (documentId: string) => {
  return doc(db, "cars", documentId)
}

export const userTargetedDocument = (documentId: string) => {
  return doc(db, "users", documentId)
}
