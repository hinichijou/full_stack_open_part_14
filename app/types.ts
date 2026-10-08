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

export type UserFields = {
  [index: string]: string,
  username: string,
  password: string,
  passwordConfirm: string,
  name: string
}

const defaultUserFields: UserFields = { username: "", password: "", passwordConfirm: "", name: ""}

export const createUserFields = (): UserFields => {
  return { ...defaultUserFields }
}