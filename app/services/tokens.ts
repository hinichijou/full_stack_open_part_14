import { eq } from "drizzle-orm"

import { db } from "@/db"
import { users } from "@/db/schema"
import { getCurrentUserOrThrow } from "@/services/session"

export const updateToken = async (token: string) => {
  const user = await getCurrentUserOrThrow()

  //In a real scenario the token should be treated as a secret but it seems that it is not required in the course material scenario
  await db.update(users).set({ token: token }).where(eq(users.id, user.id))
}