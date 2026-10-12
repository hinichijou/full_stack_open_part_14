import { NextRequest, NextResponse } from "next/server"

import { createUser } from "@/app/services/users"
import { isUserData } from "@/app/types"

export const POST = async (req: NextRequest) => {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "This endpoint is not available in production" },
      { status: 403 },
    )
  }

  const body = await req.json()
  let result = undefined

  if (isUserData(body))
    result = await createUser(body.username, body.name, body.password)

  if (result && result.length > 0) {
    return NextResponse.json(
      { message: "User created" },
      { status: 200 },
    )
  }
  else {
    return NextResponse.json(
      { error: "User creation unsuccessful" },
      { status: 500 },
    )
  }
}