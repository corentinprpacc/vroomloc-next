import CarsList from "@/components/ui/cars-list"
import { getAllCities } from "@/lib/actions"

export default async function Cars() {
  const cities = await getAllCities()
  return (
    <>
      <CarsList allCities={cities} />
    </>
  )
}
