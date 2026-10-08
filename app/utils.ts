export const getFormField = (
  key: string,
  formData: FormData,
  valid: (content: string) => boolean,
  addError: Function,
  trim: boolean = false
) => {
  const field = trim ? (formData.get(key) as string)?.trim() : formData.get(key) as string

  if (!field || !valid(field))
    addError()

  return field
}

export const getConstraintFromNeonDbError = (e: any) => {
  if (
    typeof e === "object" &&
    e !== null &&
    "cause" in e &&
    typeof e.cause === "object" &&
    e.cause !== null &&
    "constraint" in e.cause
  ) {
    return e.cause.constraint
  }

  return null
}