import UpdateCarForm from "@/components/ui/UpdateCarForm"
type GeneralCarInformationPageProps = {
  params: {
    carId: string
  }
}
export default function GeneralCarInformationPage({
  params: { carId },
}: GeneralCarInformationPageProps) {
  return <UpdateCarForm carId={carId} />
}
