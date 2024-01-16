import { collection } from "firebase/firestore"
import { db } from "./config"

export const usersCollection = collection(db, "users")
export const carsCollection = collection(db, "cars")
export const ordersCollection = collection(db, "orders")
