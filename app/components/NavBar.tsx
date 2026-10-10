"use client"

import { useSession, signOut } from "next-auth/react"

import NavLink from "./NavLink"

const NavBar = () => {
  const { data: session } = useSession()

  return (
    <nav className="bg-gray-800 text-white px-6 py-3 flex items-center gap-4">
      <NavLink href="/" >home</NavLink>
      <div className="ml-auto flex items-center gap-4">
        <NavLink href="/blogs">blogs</NavLink>
        <NavLink href="/users" >users</NavLink>
        {session ? (
          <>
            <NavLink href="/blogs/new" >create new</NavLink>
            <NavLink href="/me" >me</NavLink>
            {/* While this could be a server component calling auth in the main layout would make the whole application render as server dynamic */}
            {/* Redirect so that calling signout while in a page requiring user doesn't cause page not found errors */}
            <button
              onClick={() => signOut({ redirectTo: "/" })}
              className="mt-0 mb-0 text-base bg-red-600 hover:bg-red-400 rounded-sm"
            >
              logout
            </button>
          </>
        ) : (
          <>
            <NavLink href="/login" >login</NavLink>
            <NavLink href="/register" >register</NavLink>
          </>
        )}
      </div>
    </nav>
  )
}

export default NavBar