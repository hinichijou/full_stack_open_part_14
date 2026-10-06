import Link from "next/link"
import Form from 'next/form'

import { getBlogs } from "@/services/blogs"

const Blogs = async ({
  searchParams,
}: {
  searchParams: Promise<{ title?: string }>
}) => {
  const { title } = await searchParams
  const blogs = await getBlogs(title)
  blogs.sort((a, b) => b.likes - a.likes)

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
      <Form action="/blogs">
        {/* On submission, the input value will be appended to the URL, e.g. /search?query=abc
          Source: https://nextjs.org/docs/pages/api-reference/components/form*/}
        <input name="title" />
        <button type="submit">Search</button>
      </Form>
    </div>
  )
}

export default Blogs
