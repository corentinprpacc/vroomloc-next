"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"

type Links = { href: string; label: string }
type Props = { links: Links[] }

export default function TabMenu({ links }: Props) {
  const pathname = usePathname()
  return (
    <ul className="text-white flex gap-4">
      {links.map((link) => (
        <li
          key={link.href}
          className={`text-lg transition-all duration-500 border-b border-b-transparent hover:text-gray-300 ${pathname === link.href ? "border-b-white" : ""}`}
        >
          <Link href={link.href}>{link.label}</Link>
        </li>
      ))}
    </ul>
  )
}
