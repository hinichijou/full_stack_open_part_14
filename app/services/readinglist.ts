import { eq, and, not } from "drizzle-orm"

import { db } from "@/db"
import { readingList } from "@/db/schema"
import { getCurrentUserOrThrow } from "@/services/session"

export const getReadingList = async () => {
  const user = await getCurrentUserOrThrow()

  return await db.query.readingList.findMany({
    where: eq(readingList.userId, user.id),
    with: {
      blog: {
        columns: {
          id: true,
				  title: true
			  }
      }
    },
  })
}

export const findReadingListEntry = async (blogId: number) => {
  const user = await getCurrentUserOrThrow()

  return await db.query.readingList.findFirst({
    where: and(eq(readingList.blogId, blogId), eq(readingList.userId, user.id))
  })
}

export const createReadingListEntry = async (blogId: number, userId?: number) => {
  const uid = userId === undefined ? (await getCurrentUserOrThrow()).id : userId

  await db.insert(readingList).values({ blogId: blogId, userId: uid })
}

export const removeReadingListEntry = async (blogId: number) => {
  const user = await getCurrentUserOrThrow()

  return await db
    .delete(readingList)
    .where(and(eq(readingList.blogId, blogId), eq(readingList.userId, user.id)))
    .returning()
}

export const toggleRead = async (blogId: number) => {
  const user = await getCurrentUserOrThrow()

  return await db
    .update(readingList)
    .set({ read: not(readingList.read) })
    .where(and(eq(readingList.blogId, blogId), eq(readingList.userId, user.id)))
    .returning()
}