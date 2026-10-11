import { auth } from "@/auth"
import { eq } from "drizzle-orm"
import { db } from "@/db"
import { users } from "@/db/schema"

export const getCurrentUser = async () => {
  const session = await auth()
  if (!session?.user?.email) {
    return null
  }

  return db.query.users.findFirst({
    where: eq(users.username, session.user.email),
  })
}

export const getCurrentUserOrThrow = async () => {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error("Not logged in")
  }

  return user
}