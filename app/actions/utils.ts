"use server"

import { redirect } from "next/navigation"
import { auth } from "@/auth"

export const testLoggedIn = async () => {
  const session = await auth()
  if (!session) {
    redirect("/login")
  }
}