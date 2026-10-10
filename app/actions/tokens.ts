"use server"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"

import { updateToken } from "@/services/tokens"

export const createToken = async () => {
  const session = await auth()
  if (!session) {
    redirect("/login")
  }

  const token = crypto.randomUUID()

  await updateToken(token)

  revalidatePath("/me")
}