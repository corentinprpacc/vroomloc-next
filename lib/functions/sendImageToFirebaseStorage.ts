import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage"
import "../../app/firebase/config"
import currentDateTimestamp from "./convertDateToTimestamp"

const sendImageToFirebaseStorage = async (image: any) => {
  try {
    const storage = getStorage()

    const uniqueImageName = currentDateTimestamp()

    const storageRef = ref(storage, "images/" + uniqueImageName)

    if (image) {
      await uploadBytes(storageRef, image)
    }

    const downloadURL = await getDownloadURL(storageRef)

    return downloadURL
  } catch (error) {
    console.error("Erreur lors de l'upload de l'image :", error)
  }
}

export default sendImageToFirebaseStorage
