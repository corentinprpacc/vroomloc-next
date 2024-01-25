import MoreInfosForm from "@/components/ui/MoreInfosForm"

export default async function moreInfo() {
  return (
    <div className="bg-black min-h-screen pt-8">
      <h1 className="text-center text-white text-3xl">
        Complétez ces informations
      </h1>
      <div className="mt-8">
        <MoreInfosForm />
      </div>
    </div>
  )
}
