import Form from 'next/form'
import { Suspense } from "react"

import { getBlogs } from "@/services/blogs"
import ListItemBox from '@/components/ListItemBox'

const BlogList = async ({title}: {title?: string}) => {
  const blogs = await getBlogs(title)
  blogs.sort((a, b) => b.likes - a.likes)
  return (
    <ul data-testid="blogs-list" className="list">
      {blogs.map(blog => (
        <ListItemBox
          key={blog.id}
          href={`/blogs/${blog.id}`}
          text={`${blog.title} ${blog.likes} likes`}
        />
      ))}
    </ul>
  )
}

const Blogs = async ({
  searchParams,
}: {
  searchParams: Promise<{ title?: string }>
}) => {
  const { title } = await searchParams

  return (
    <div className="topdiv">
      <h2>Blogs</h2>
      <BlogList title={title} />
      <Form action="/blogs">
        {/* On submission, the input value will be appended to the URL, e.g. /search?query=abc
          Source: https://nextjs.org/docs/pages/api-reference/components/form*/}
        <input data-testid="filter-input" name="title" className="mr-4" />
        <button data-testid="search-button" type="submit">Search</button>
      </Form>
    </div>
  )
}

export default Blogs
