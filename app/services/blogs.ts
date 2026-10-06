import { eq, ilike, sql } from "drizzle-orm"
import { db } from "@/db"
import { blogs } from "@/db/schema"


export const getBlogs = async (title?: string) => {
  if (title) {
    return db.query.blogs.findMany({
      where: ilike(blogs.title, `%${title}%`),
    })
  }

  return db.query.blogs.findMany()
}

export const addBlog = async (title: string, author: string, url: string ) => {
  //Temporary workaround
  const user = await db.query.users.findFirst({
    orderBy: sql`RANDOM()`,
  })
  const userId = user != null ? user.id : 1

  await db.insert(blogs).values({ title, author, url, userId })
}

export const getBlogById = async (id: number) => {
  return db.query.blogs.findFirst({
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