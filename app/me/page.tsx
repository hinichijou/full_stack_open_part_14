import { notFound } from "next/navigation"

import { createToken } from "@/actions/tokens"
import { getCurrentUser } from "@/services/session"

const MyPage = async () => {
  const user = await getCurrentUser()

  if (!user) {
    notFound()
  }

  return (
    <div className="topdiv">
      <div className="contentdiv">
        <h2>My Profile</h2>
        <p className="mb-2">
          <span className="font-semibold">Name: </span>
          <span>{user.name}</span>
        </p>
        <p className="mb-4">
          <span className="font-semibold">Username: </span>
          <span>{user.username}</span>
        </p>
        <hr className="mb-4"></hr>
        <h2>API Token</h2>
        <div className="bg-cardlvl2 rounded-md p-2">
          <span className="inline-block pb-2 text-gray-700">Current token:</span>
          <div className="bg-cardlvl3 rounded-md p-2">
            <span>{user.token ? user.token: "No token has been generated yet"}</span>
          </div>
        </div>
        <form action={createToken}>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-400 w-48"
          >
            Generate New Token
          </button>
        </form>
      </div>
    </div>
  )
}

export default MyPage