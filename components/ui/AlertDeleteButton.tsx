import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { TrashIcon } from "lucide-react"

type AlertDeleteButtonProps = {
  clickOnDelete: any
  title: string
  children: any
}

export const AlertDeleteButton = ({
  clickOnDelete,
  title,
  children,
}: AlertDeleteButtonProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <TrashIcon className="h-6 w-6 text-red-500" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-500">{title}</AlertDialogTitle>
          <AlertDialogDescription>{children}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction
            onClick={clickOnDelete}
            className="bg-red-500 hover:bg-white hover:text-red-500"
          >
            Supprimer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
