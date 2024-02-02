import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import sendImageToFirebaseStorage from "@/lib/functions/sendImageToFirebaseStorage"

type InputFileType = {
  label: string
  register: any
  setValue: any
}

export async function InputFile({ label, register, setValue }: InputFileType) {
  const handleImageChange = async (e: any) => {
    if (e.target.files.length > 0) {
      const selectedImage = e.target.files[0]
      const imageUrl = await sendImageToFirebaseStorage(selectedImage)

      if (imageUrl) {
        setValue("imageUrl", imageUrl)
      }
    }
  }
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="picture">{label}</Label>
      <Input
        id="picture"
        type="file"
        className="bg-gray-500 text-white"
        {...register}
        onChange={handleImageChange}
      />
    </div>
  )
}
