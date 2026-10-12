import { db } from "@/db"
import { users, blogs, readingList } from "@/db/schema"

const deleteReadingListEntries = async () => {
  try {
    await db.delete(readingList)
  }
  catch(e) {
    console.error(e)
    return false
  }

  return true
}

const deleteBlogs = async () => {
  try {
    await db.delete(blogs);
  }
  catch(e) {
    console.error(e);
    return false;
  }

  return true;
}

const deleteUsers = async () => {
  try {
    await db.delete(users)
  }
  catch(e) {
    console.error(e)
    return false
  }

  return true
}

export const deleteDatabaseContents = async () => {
  let success = await deleteReadingListEntries()
  if (!success)
    return false

  success = await deleteBlogs()
  if (!success)
    return false

  success = await deleteUsers()
  if (!success)
    return false

  return true
}