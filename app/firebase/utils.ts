import { getDocs, query, where } from "firebase/firestore"
import {
  carsCollection,
  ordersCollection,
  usersCollection,
} from "./collections"
import { Car, Customer, Order, RentalAgency } from "./types"

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

export const getAllOrders = async (): Promise<Order[]> => {
  const ordersDocs = await getDocs(ordersCollection)
  return ordersDocs.docs.map((doc) => ({
    ...(doc.data() as Order),
  }))
}
