import { eq } from "drizzle-orm"
import { db } from "@/db"
import { users } from "@/db/schema"
import { createPasswordHash } from "@/app/utils"

export const getUsers = async () => {
  return db.query.users.findMany({
    columns: {
		  passwordHash: false,
      token: false
	  },
  })
}

export const getUserWithBlogs = async (username: string) => {
  return db.query.users.findFirst({
    where: eq(users.username, username),
    with: { blogs: true },
    columns: {
		  passwordHash: false,
      token: false
	  },
  })
}

// In a real scenario it would probably make sense to have the secrets in a separate table
export const getUserWithToken = async (token: string) => {
  return db.query.users.findFirst({
    where: eq(users.token, token),
    with: {
      blogs: {
        columns: {
				  userId: false,
          id: false
			  }
      }
    },
    columns: {
		  passwordHash: false,
      token: false
	  },
  })
}

export const createUser = async (username: string, name: string, password: string) => {
  const passwordHash = await createPasswordHash(password)
  return db.insert(users).values({ username, name, passwordHash }).returning()
}