import CarsList from "@/components/ui/cars-list"
import { getAllCities } from "@/lib/actions"

export default async function Cars({
  children,
}: {
  children: React.ReactNode
}) {
  const cities = await getAllCities()
  return (
    <>
      <CarsList allCities={cities} />
      {children}
    </>
  )
}
