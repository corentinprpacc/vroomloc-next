import UpdateEmailForm from "@/components/ui/forms/sensitive/UpdateEmailForm"
import UpdatePasswordForm from "@/components/ui/forms/sensitive/UpdatePasswordForm"

export default async function page() {
  return (
    <div className="flex flex-col items-center w-full gap-8">
      <div className="w-full flex flex-col gap-4 items-center">
        <p className="text-xl font-medium">Modifier votre adresse mail</p>
        <UpdateEmailForm />
      </div>
      <div className="w-full flex flex-col items-center gap-4">
        <p className="text-xl font-medium">Modifier votre mot de passe</p>
        <UpdatePasswordForm />
      </div>
    </div>
  )
}
