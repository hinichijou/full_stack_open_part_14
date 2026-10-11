"use server"
import { revalidatePath } from "next/cache"

import { updateToken } from "@/services/tokens"
import { testLoggedIn } from "@/actions/utils"

export const createToken = async () => {
  testLoggedIn()

  const token = crypto.randomUUID()

  await updateToken(token)

  revalidatePath("/me")
}