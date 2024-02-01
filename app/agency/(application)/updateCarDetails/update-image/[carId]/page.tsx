"use client"

import { getCarById } from "@/app/firebase/utils"
import Loader from "@/components/ui/Loader"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { updateCarImage } from "@/lib/actions"
import sendImageToFirebaseStorage from "@/lib/functions/sendImageToFirebaseStorage"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

type UpdateImagePageProps = {
  params: {
    carId: string
  }
}

export default function UpdateImagePage({
  params: { carId },
}: UpdateImagePageProps) {
  const pathname = usePathname()
  const [currentCarImage, setCurrentCarImage] = useState("")
  const [selectedImage, setSelectedImage] = useState("")
  const [selectedFile, setSelectedFile] = useState<any>()
  const [isFileUploading, setIsFileUploading] = useState(false)
  const [error, setError] = useState<string>("")

  async function handleImage(e: any) {
    if (e.target.files) {
      console.log("fiiile", e.target.files[0])
      setSelectedImage(URL.createObjectURL(e.target.files[0]))
      setSelectedFile(e.target.files[0])
      setError("")
    }
  }

  async function processedNewImage() {
    setIsFileUploading(true)
    if (selectedFile) {
      const imageUrl = await sendImageToFirebaseStorage(selectedFile)
      if (imageUrl && carId) {
        await updateCarImage(carId, imageUrl)
      }
    }
    setError("Veuillez sélectionner une image")
    setIsFileUploading(false)
  }

  useEffect(() => {
    async function fetchCarDatas() {
      const carDatas = await getCarById(carId)

      console.log("current image set", carDatas.imageUrl)
      setCurrentCarImage(carDatas.imageUrl)
    }

    fetchCarDatas()
  }, [carId])

  return (
    <div className="ml-8 mt-8 h-screen">
      <ul className="text-white flex gap-4">
        <li
          className={`text-lg transition-all duration-500 border-b border-b-transparent hover:text-gray-300 ${
            pathname === `/agency/updateCarDetails/general-information/${carId}`
              ? "border-b-white"
              : ""
          }`}
        >
          <Link
            href={{
              pathname: `/agency/updateCarDetails/general-information/${carId}`,
            }}
          >
            Informations générales
          </Link>
        </li>
        <li
          className={`text-lg transition-all duration-500 border-b border-b-transparent hover:text-gray-300 ${
            pathname === `/agency/updateCarDetails/update-image/${carId}`
              ? "border-b-white"
              : ""
          }`}
        >
          <Link
            href={{
              pathname: `/agency/updateCarDetails/update-image/${carId}`,
            }}
          >
            Image
          </Link>
        </li>
      </ul>
      <div className="flex flex-col items-center space-y-4">
        <div>
          <Input
            id="new-image"
            type="file"
            className="bg-gray-500"
            onChange={handleImage}
          />
        </div>
        <Image
          src={selectedImage ? selectedImage : currentCarImage}
          alt="car"
          width="384"
          height="300"
          sizes="100vw"
          className="w-96 h-[300px] rounded mt-8"
        />

        <Button className="w-[384px]" onClick={processedNewImage}>
          {isFileUploading ? <Loader className="h-8" /> : "Modifier"}
        </Button>
        {error && <span className="text-red-700">{error}</span>}
      </div>
    </div>
  )
}
