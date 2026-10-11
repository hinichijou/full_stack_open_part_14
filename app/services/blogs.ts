import { eq, ilike } from "drizzle-orm"
import { db } from "@/db"
import { blogs } from "@/db/schema"
import { getCurrentUserOrThrow } from "@/services/session"
import { createReadingListEntry } from "./readinglist"


export const getBlogs = async (title?: string) => {
  if (title) {
    return db.query.blogs.findMany({
      where: ilike(blogs.title, `%${title}%`),
    })
  }

  return await db.query.blogs.findMany()
}

export const addBlog = async (title: string, author: string, url: string ) => {
  const user = await getCurrentUserOrThrow()

  //Can return a database error that will throw. Can theoretically return an empty list so also taking that possibility into account.
  const inserted = await db.insert(blogs).values({ title, author, url, userId: user.id }).returning({ id: blogs.id })

  if (inserted.length > 0 && inserted[0].id) {
    //Passing the same user id so there shouldn't be a situation where the user logs out during the insert operation causing the reading list entry insert to fail
    //Could be a transaction but I think it also makes sense to create the blog and leave it to the user to manually add the blog to the reading list if the reading list entry creation fails
    await createReadingListEntry(inserted[0].id, user.id)
  }
}

export const getBlogById = async (id: number) => {
  return await db.query.blogs.findFirst({
    where: eq(blogs.id, id),
  })
}

export const likeBlogById = async (id: number) => {
  const blog = await getBlogById(id)
  if (blog) {
    await db
      .update(blogs)
      .set({ likes: blog.likes + 1 })
      .where(eq(blogs.id, id))
  }
}