'use client'

import { usePathname } from 'next/navigation'
import Link from "next/link"

interface NavLinkProps {
  href: string
  children: React.ReactNode
}

const NavLink = ({ href, children }: NavLinkProps) => {
  const pathname = usePathname()
  const visual = pathname === href ? "underline font-semibold" : "hover:text-gray-300"
  return (
    <Link href={href} className={visual}>
      {children}
    </Link>
  )
}

export default NavLink