import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage"
import currentDateTimestamp from "./convertDateToTimestamp"
import "../../app/firebase/config"

const sendImageToFirebaseStorage = async (image: any) => {
  try {
    const storage = getStorage()

    const uniqueImageName = currentDateTimestamp()

    const storageRef = ref(storage, "images/" + uniqueImageName)

    if (image) {
      await uploadBytes(storageRef, image)
    } else {
      console.log("Erreur: Il n'y a aucune image")
    }

    const downloadURL = await getDownloadURL(storageRef)

    return downloadURL

    console.log("image uploadé avec succes", downloadURL)
  } catch (error) {
    console.error("Erreur lors de l'upload de l'image :", error)
  }
}

export default sendImageToFirebaseStorage
