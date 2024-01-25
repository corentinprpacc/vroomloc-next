import { DocumentReference, Timestamp } from "firebase/firestore"

export type User = {
  id: string
  email: string
  firstName: string
  password: string
  name: string
  phoneNumber: string
  role: string
}
export type Customer = {} & User
export type RentalAgency = {
  companyName: string
  city: string
  street: string
  postalCode: string
} & User
export type Car = {
  id: string
  brand: string
  model: string
  car_year: number
  companyId: DocumentReference
  dayPrice: number
  description: string
  engineType: string
  fuelType: string
  horsePower: number
  images: Array<string>
  kilometerAllowed: string
  options: Array<string>
  rentDeposit: number
  siege: number
  weekEndPrice: number
  weekPrice: number
  city: string
}
export type Order = {
  id: string
  brand: string
  model: string
  carId: DocumentReference
  companyId: DocumentReference
  created_at: string
  customerFirstName: string
  customerName: string
  customerId: DocumentReference
  orderPrice: number
  paymentStatus: string
  rentStartDate: string
  rentEndDate: string
  rentStatus: string
}

export type UpdateUserData = {
  email: string
  userId: string
  expiresAt: Timestamp
}
