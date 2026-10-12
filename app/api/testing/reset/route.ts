import { NextRequest, NextResponse } from "next/server"

import { deleteDatabaseContents } from "@/app/services/test"

export const DELETE = async (req: NextRequest) => {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "This endpoint is not available in production" },
      { status: 403 },
    )
  }

  const success = await deleteDatabaseContents()

  if (success) {
    return NextResponse.json(
      { message: "Database contents deleted" },
      { status: 200 },
    )
  }
  else {
    return NextResponse.json(
      { error: "Could not delete database contents" },
      { status: 500 },
    )
  }
}