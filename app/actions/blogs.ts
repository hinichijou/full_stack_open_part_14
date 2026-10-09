"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { addBlog, likeBlogById } from "@/services/blogs"
import { auth } from "@/auth"

import { titleMinLength, authorMinLength, urlMinLength} from "@/app/constants"
import { createBlogFields, type BlogFields } from "@/app/types"
import { getFormField } from "@/app/utils"

export const createBlog = async (
  prevState: { errors: BlogFields, values: BlogFields, success: boolean },
  formData: FormData
) => {
  const session = await auth()
  if (!session) {
    redirect("/login")
  }

  const errors: BlogFields = createBlogFields()

  const title = getFormField(
    "title",
    formData,
    (title: string) => title.length >= titleMinLength,
    () => errors.title = `Title must be at least ${titleMinLength} characters long.`
  )

  const author = getFormField(
    "author",
    formData,
    (author: string) => author.length >= authorMinLength,
    () => errors.author = `Author must be at least ${authorMinLength} characters long`
  )

  const url = getFormField(
    "url",
    formData,
    (url: string) => url.length >= urlMinLength,
    () => errors.url = `URL must be at least ${urlMinLength} characters long`
  )

  if (errors.title || errors.author || errors.url)
    return { errors: errors, values: { title, author, url }, success: false}

  await addBlog(title, author, url)

  revalidatePath("/blogs")
  return { errors: errors, values: { title, author, url }, success: true}
}

export const likeBlog = async (formData: FormData) => {
  const id = Number(formData.get("id"))
  await likeBlogById(id)
  revalidatePath(`/blogs/${id}`)
  revalidatePath("/blogs")
}