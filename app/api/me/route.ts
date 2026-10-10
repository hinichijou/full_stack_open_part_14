import { NextRequest, NextResponse } from "next/server"
import { getUserWithToken } from "@/services/users"

const unauthorizedResponse = () => {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}

export const GET = async (req: NextRequest) => {
  const header = req.headers.get("Authorization")

  if (header === null)
    return unauthorizedResponse()

  // For validation: https://developer.mozilla.org/en-US/docs/Glossary/UUID
  const token = header.replace("Bearer ", "")
  if(token.length !== 36)
    return unauthorizedResponse()

  const splits = token.split("-")
  if (splits.length !== 5) {
    return unauthorizedResponse()
  } else {
    const regex = RegExp("^[0-9a-f]+$")
    for (const s of splits) {
      if(!regex.test(s))
        return unauthorizedResponse()
    }
  }

  const user = await getUserWithToken(token)

  if (user)
    return NextResponse.json(user)
  else
    return unauthorizedResponse()
}