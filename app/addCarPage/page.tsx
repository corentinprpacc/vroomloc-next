"use client"

import { useState } from "react"
import "../firebase/config"
import sendImageToFirebaseStorage from "@/lib/sendImageToFirebaseStorage"
const AddCarPage = () => {
  const [image, setImage] = useState(null)

  const handleImageChange = (e: any) => {
    if (e.target.files.length > 0) {
      const selectedImage = e.target.files[0]
      setImage(selectedImage)
    }
  }

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      <button onClick={() => sendImageToFirebaseStorage(image)}>Envoyer</button>
    </div>
  )
}

export default AddCarPage
