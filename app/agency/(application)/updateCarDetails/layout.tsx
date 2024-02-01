import { ArrowLeftIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
const UpdateCarDetailsLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <div className="bg-black text-white">
      <div className="flex justify-between items-center pl-2 pr-2 sticky top-0 z-20 bg-black h-20">
        <p className=" hover:cursor-pointer">
          <Link href={"/agency/myCars"}>
            <ArrowLeftIcon className="h-6 w-6 text-white" />
          </Link>
        </p>
        <h1 className="text-4xl font-bold bg-black text-center text-white">
          Modifications véhicule
        </h1>
        <div></div>
      </div>
      {children}
    </div>
  )
}

export default UpdateCarDetailsLayout
