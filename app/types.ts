export type BlogFields = {
  [index: string]: string,
  title: string,
  author: string,
  url: string
}

const defaultBlogFields: BlogFields = { title: "", author: "", url: ""}

export const createBlogFields = (): BlogFields => {
  return { ...defaultBlogFields }
}

export interface UserData {
  username: string,
  password: string,
  name: string
}

export type UserFields = UserData & {
  [index: string]: string,
  passwordConfirm: string,
}

const defaultUserFields: UserFields = { username: "", password: "", passwordConfirm: "", name: ""}

export const createUserFields = (): UserFields => {
  return { ...defaultUserFields }
}

export function isUserData(obj: Object): obj is UserData {
  return Object.hasOwn(obj, "username") && Object.hasOwn(obj, "password") && Object.hasOwn(obj, "name")
}