import { redirect } from "next/navigation"

import { createToken } from "@/app/actions/token"
import { getCurrentUser } from "@/services/session"
import { getReadingList } from "@/services/readinglist"
import { toggleBlogRead } from "@/actions/readinglist"
import ListItemBox from '@/components/ListItemBox'
import ListItemBoxWithButton from "@/components/ListItemBoxWithButton"

// Can't infer directly from schema because using partial return
interface ReadingListBlog {
  id: number,
  title: string
}

const UnreadSection = async ({unread}: {unread: (ReadingListBlog)[]}) => {
  return (
    <>
      <h3>Unread ({unread.length})</h3>
      { unread.length > 0 ?
        <ul data-testid="unread-section" className="list">
          {unread.map(b => (
            <ListItemBoxWithButton
              key={b.id}
              href={`/blogs/${b.id}`}
              text={`${b.title}`}
              liClassName="listitembox bg-yellow-100 hover:bg-yellow-50"
              formButtonProps={{
                action: toggleBlogRead,
                inputValue: b.id,
                text: "Mark as read",
                buttonClass: "w-32 bg-green-600 hover:bg-green-400",
                data_testid: `mark-read-${b.id}`
              }}
            />
          ))}
        </ul> :
        <span data-testid="no-unread-blogs">No unread blogs</span>
      }
    </>
  )
}

const ReadSection = async ({read}: {read: (ReadingListBlog)[]}) => {
  return (
    <>
      <h3>Read ({read.length})</h3>
      { read.length > 0 ?
        <ul data-testid="read-section" className="list">
          {read.map(b => (
            <ListItemBox
              key={b.id}
              href={`/blogs/${b.id}`}
              text={`${b.title}`}
              liClassName="listitembox bg-sky-100 hover:bg-sky-50"
            />
          ))}
        </ul> :
        <span data-testid="no-read-blogs">No read blogs</span>
      }
    </>
  )
}

const MyPage = async () => {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  const rl = await getReadingList()
  const read = []
  const unread = []

  // Object.groupBy would be an option as well but a basic for loop is easy to read and handle
  for (const e of rl) {
    if (e.read)
      read.push(e.blog)
    else
      unread.push(e.blog)
  }

  return (
    <div data-testid="user-profile" className="topdiv">
      <div className="contentdiv">
        <h2>My Profile</h2>
        <p className="mb-2">
          <span className="font-semibold">Name: </span>
          <span data-testid="user-name">{user.name}</span>
        </p>
        <p className="mb-4">
          <span className="font-semibold">Username: </span>
          <span data-testid="user-username">{user.username}</span>
        </p>
        <hr className="mb-4"></hr>
        <h2 data-testid="reading-list-section">Reading List</h2>
        { unread.length > 0 || read.length > 0 ?
          (
            <>
              <UnreadSection unread={unread} />
              <ReadSection read={read} />
            </>
          ) : (
          <span data-testid="empty-reading-list">Your reading list is empty. Try adding a Blog!</span>)
        }
        <hr className="my-4"></hr>
        <h2 data-testid="api-token-section">API Token</h2>
        <div className="bg-cardlvl2 rounded-md p-2">
          <span className="inline-block pb-2 text-textlight">Current token:</span>
          <div className="bg-cardlvl3 rounded-md p-2">
            {
              user.token ?
                <span data-testid="token-display"><code data-testid="api-token">{user.token}</code></span> :
                <span data-testid="no-token-message">No token has been generated yet</span>
            }
          </div>
        </div>
        <form action={createToken}>
          <button
            data-testid="generate-token-button"
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