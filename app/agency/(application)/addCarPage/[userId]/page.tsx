import AddCarForm from "@/components/ui/AddCarForm"

export default function AddCarPage({ params: { userId } }: any) {
  return (
    <div className="bg-black text-white pt-6">
      <h1 className="text-4xl font-bold bg-black text-center text-white">
        Agence - Ajout véhicule
      </h1>
      <div className="mt-8">
        <AddCarForm currentUserId={userId} />
      </div>
    </div>
  )
}
