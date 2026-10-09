import { notFound } from "next/navigation"
import { getBlogById } from "@/services/blogs"
import { likeBlog } from "@/actions/blogs"

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const blog = await getBlogById(Number(id))

  if (!blog) {
    notFound()
  }

  return (
    <div className="topdiv">
      <h2>{blog.title}</h2>
      <div className="contentdiv">
        <p>Author: {blog.author}</p>
        <p>URL: {blog.url}</p>
        <p>Likes: {blog.likes}</p>
      </div>
      <form action={likeBlog}>
        <input type="hidden" name="id" value={blog.id} />
        <button type="submit" className="w-32">
          Like this blog
        </button>
      </form>
    </div>
  )
}

export default BlogPage