import { eq } from "drizzle-orm"

import { db } from "@/db"
import { users } from "@/db/schema"
import { getCurrentUser } from "@/services/session"

export const updateToken = async (token: string) => {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error("Not logged in")
  }

  //In a real scenario the token should be treated as a secret but it seems that it is not required in the course material scenario
  await db.update(users).set({ token: token }).where(eq(users.id, user.id))
}