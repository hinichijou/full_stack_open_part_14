"use server"

import { revalidatePath } from "next/cache"
import bcrypt from "bcryptjs"

import { db } from "@/db"
import { users } from "@/db/schema"
import { createUserFields, type UserFields } from "@/app/types"
import { getFormField, getConstraintFromNeonDbError } from "@/app/utils"
import { usernameMinLength, passwordMinLength} from "@/app/constants"

export const registerUser = async (
  prevState: { errors: UserFields, values: UserFields, success: boolean },
  formData: FormData
) => {
  const errors: UserFields = createUserFields()

  const username = getFormField(
    "username",
    formData,
    (username: string) => username.length >= usernameMinLength,
    () => errors.username = `Username must be at least ${usernameMinLength} characters long.`,
    true
  )

  const name = (formData.get("name") as string)?.trim()

  const password = getFormField(
    "password",
    formData,
    (password: string) => password.length >= passwordMinLength,
    () => errors.password = `Password must be at least ${passwordMinLength} characters long.`
  )

  const passwordConfirm = getFormField(
    "passwordConfirm",
    formData,
    (passwordConfirm: string) => passwordConfirm === password,
    () => errors.passwordConfirm = `The passwords don't match. Please make sure the passwords are exactly the same.`
  )

  if (errors.username || errors.name || errors.password || errors.passwordConfirm)
    return { errors: errors, values: { username, name, password, passwordConfirm }, success: false }

  const passwordHash = await bcrypt.hash(password, 10)

  try{
    await db.insert(users).values({ username, name, passwordHash })
  }
  catch(e){
    //Getting data out of the error felt needlessly complicated but I couldn't find any documentation about handling the NeonDB errors
    const constraint = getConstraintFromNeonDbError(e)
    if (constraint === "users_username_unique"){
      errors.username = `Username already taken. Please input another username.`
    }
    //Errors we weren't expecting
    else {
      console.error(`Unhandled error ${e}`)
    }

    return { errors: errors, values: { username, name, password, passwordConfirm }, success: false }
  }

  revalidatePath("/users")
  return { errors: errors, values: { username, name, password, passwordConfirm }, success: true }
}