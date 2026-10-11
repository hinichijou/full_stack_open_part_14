import Form from 'next/form'

import { getBlogs } from "@/services/blogs"
import ListItemBox from '@/components/ListItemBox'

const Blogs = async ({
  searchParams,
}: {
  searchParams: Promise<{ title?: string }>
}) => {
  const { title } = await searchParams
  const blogs = await getBlogs(title)
  blogs.sort((a, b) => b.likes - a.likes)

  return (
    <div className="topdiv">
      <h2>Blogs</h2>
      <ul className="list">
        {blogs.map(blog => (
          <ListItemBox
            key={blog.id}
            href={`/blogs/${blog.id}`}
            text={`Title: ${blog.title} Author: ${blog.author} URL: ${blog.url} Likes: ${blog.likes}`}
          />
        ))}
      </ul>
      <Form action="/blogs">
        {/* On submission, the input value will be appended to the URL, e.g. /search?query=abc
          Source: https://nextjs.org/docs/pages/api-reference/components/form*/}
        <input name="title" className="mr-4" />
        <button type="submit">Search</button>
      </Form>
    </div>
  )
}

export default Blogs
