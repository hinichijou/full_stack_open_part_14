"use server"

import { revalidatePath } from "next/cache"

import { testLoggedIn } from "@/actions/utils"
import { createReadingListEntry, removeReadingListEntry, toggleRead } from "@/services/readinglist"

export const addBlogToReadingList = async (formData: FormData) => {
  testLoggedIn()

  const id = Number(formData.get("id"))
  createReadingListEntry(id)
  revalidatePath(`/blogs/${id}`)
  revalidatePath("/me")
}

export const removeBlogFromReadingList = async (formData: FormData) => {
  testLoggedIn()

  const id = Number(formData.get("id"))
  removeReadingListEntry(id)
  revalidatePath(`/blogs/${id}`)
  revalidatePath("/me")
}

export const toggleBlogRead = async (formData: FormData) => {
  testLoggedIn()

  const id = Number(formData.get("id"))
  toggleRead(id)
  revalidatePath(`/blogs/${id}`)
  revalidatePath("/me")
}