import { notFound } from "next/navigation"

import { createToken } from "@/app/actions/token"
import { getCurrentUser } from "@/services/session"
import { getReadingList } from "@/services/readinglist"
import { toggleBlogRead } from "@/actions/readinglist"
import ListItemBox from '@/components/ListItemBox'
import ListItemBoxWithButton from "@/components/ListItemBoxWithButton"

const MyPage = async () => {
  const user = await getCurrentUser()

  if (!user) {
    notFound()
  }

  const rl = await getReadingList()
  const read = []
  const unread = []

  // Object.groupBy would be an option as well but a basic for loop is easy to read and handle
  for (const e of rl) {
    if (e.read)
      read.push(e)
    else
      unread.push(e)
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
        <h2>Reading List</h2>
        <h3>Unread ({unread.length})</h3>
        <ul className="list">
          {unread.map(r => (
            <ListItemBoxWithButton
              key={r.id}
              href={`/blogs/${r.blog.id}`}
              text={`${r.blog.title}`}
              liClassName="listitembox bg-yellow-100 hover:bg-yellow-50"
              formButtonProps={{
                action: toggleBlogRead,
                inputValue: r.blog.id,
                text: "Mark as read",
                buttonClass: "w-32 bg-green-600 hover:bg-green-400",
              }}
            />
          ))}
        </ul>
        <h3>Read ({read.length})</h3>
        <ul className="list">
          {read.map(r => (
            <ListItemBox
              key={r.id}
              href={`/blogs/${r.blog.id}`}
              text={`${r.blog.title}`}
              liClassName="listitembox bg-sky-100 hover:bg-sky-50"
            />
          ))}
        </ul>
        <hr className="mb-4"></hr>
        <h2>API Token</h2>
        <div className="bg-cardlvl2 rounded-md p-2">
          <span className="inline-block pb-2 text-textlight">Current token:</span>
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