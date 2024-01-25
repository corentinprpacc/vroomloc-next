import TabMenu from "@/components/ui/TabMenu"
import React from "react"

export default function EditProfilePage({
  children,
}: {
  children: React.ReactNode
}) {
  const links = [
    { label: "Informations Générales", href: "/agency/profile/edit/general" },
    {
      label: "Informations Confidentielles",
      href: "/agency/profile/edit/sensitive",
    },
  ]
  return (
    <div className="min-h-screen bg-black pt-6">
      <h1 className="text-4xl font-bold text-center text-white">
        Agence - Profil - Modification
      </h1>
      <div className="ml-8 mt-8">
        <TabMenu links={links} />
      </div>
      <div className="mt-12 text-white">{children}</div>
    </div>
  )
}
