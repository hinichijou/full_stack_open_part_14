import Link from "next/link"
import { notFound } from "next/navigation"
import { getUserWithBlogs } from "@/services/users"

const UserPage = async ({ params }: { params: Promise<{ username: string }> }) => {
  const { username } = await params
  const user = await getUserWithBlogs(username)

  if (!user) {
    notFound()
  }

  return (
    <div className="topdiv">
      <h2>{user.name}</h2>
      <div className="contentdiv">
        <p>Username: {user.username}</p>
      </div>
      <h3>Blogs</h3>
      <ul className="list">
        {user.blogs.map((blog) => (
          <li key={blog.id} className="listitembox">
            <Link href={`/blogs/${blog.id}`} className="listitem">{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserPage