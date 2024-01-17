import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between p-8">
      <Link
        href=""
        className="text-lg transition-all hover:border-b-white border-b border-b-transparent"
      >
        LOUER MA VOITURE
      </Link>
      <span className="font-bold text-4xl">VROOMLOC</span>
      <Link
        href=""
        className="text-lg hover:border-b-white border-b border-b-transparent"
      >
        NOS VOITURES
      </Link>
    </nav>
  )
}
