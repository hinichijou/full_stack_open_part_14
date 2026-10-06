import Link from "next/link"
import { getBlogs } from "@/services/blogs"

const Blogs = () => {
  const blogs = getBlogs()
  return (
    <div>
      <h2>Blogs</h2>
      <ul>
        {blogs.map(blog => (
          <li key={blog.id}>
            <Link href={`/blogs/${blog.id}`}>
              Title: {blog.title} Author: {blog.author} URL: {blog.url} Likes: {blog.likes}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Blogs
