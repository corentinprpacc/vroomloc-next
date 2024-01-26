import {
  getDocs,
  query,
  where,
  DocumentReference,
  Timestamp,
} from "firebase/firestore"
import {
  carsCollection,
  ordersCollection,
  updateUserDataCollection,
  usersCollection,
} from "./collections"
import {
  Car,
  Customer,
  Order,
  RentalAgency,
  UpdateUserData,
  User,
} from "./types"

export const getAllCustomers = async (): Promise<Customer[]> => {
  const queryCustomers = query(usersCollection, where("role", "==", "customer"))
  const customersDocs = await getDocs(queryCustomers)
  return customersDocs.docs.map((doc) => ({
    ...(doc.data() as Customer),
  }))
}

export const getAllRentalAgencies = async (): Promise<RentalAgency[]> => {
  const agenciesQuery = query(usersCollection, where("role", "==", "company"))
  const agenciesDocs = await getDocs(agenciesQuery)
  return agenciesDocs.docs.map((doc) => ({
    ...(doc.data() as RentalAgency),
  }))
}

export const getAllCars = async (): Promise<Car[]> => {
  const carsDocs = await getDocs(carsCollection)
  return carsDocs.docs.map((doc) => ({
    ...(doc.data() as Car),
  }))
}

export const getCarById = async (id: string): Promise<Car | null> => {
  const queryCar = query(carsCollection, where("id", "==", id))
  const docsCar = await getDocs(queryCar)
  if (docsCar.docs.length === 0) {
    return null
  }
  const carsMap = docsCar.docs.map((doc) => {
    return { ...doc.data() }
  })
  return carsMap[0] as Car
}

export const getAllOrders = async (): Promise<Order[]> => {
  const ordersDocs = await getDocs(ordersCollection)
  return ordersDocs.docs.map((doc) => ({
    ...(doc.data() as Order),
  }))
}

export const getUserByEmail = async (email: string): Promise<User | null> => {
  const queryUser = query(usersCollection, where("email", "==", email))
  const docsUser = await getDocs(queryUser)
  if (docsUser.docs.length === 0) {
    return null
  }
  const usersMap = docsUser.docs.map((doc) => {
    return { ...doc.data() }
  })
  return usersMap[0] as User
}

export const getUserRefByEmail = async (
  email: string,
): Promise<DocumentReference | null> => {
  const queryUser = query(usersCollection, where("email", "==", email))
  const docsUser = await getDocs(queryUser)
  if (docsUser.docs.length === 0) {
    return null
  }
  const usersMap = docsUser.docs.map((doc) => {
    return doc.ref
  })
  return usersMap[0]
}

type updateUserReturn = {
  ref: DocumentReference
  data: UpdateUserData
}

export const getUpdateUserDataByEmail = async (
  email: string,
): Promise<updateUserReturn | null> => {
  const queryUpdateUser = query(
    updateUserDataCollection,
    where("email", "==", email),
  )
  const docsUpdateUser = await getDocs(queryUpdateUser)
  if (docsUpdateUser.docs.length === 0) return null
  const updateUsersMap = docsUpdateUser.docs.map((doc) => {
    return { ref: doc.ref, data: doc.data() }
  })
  return updateUsersMap[0] as updateUserReturn
}

export const checkUpdateSessionIsExpired = (date: Timestamp): boolean => {
  const userDate = new Date(date.toDate())
  return userDate < new Date()
}
