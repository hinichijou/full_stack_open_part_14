import { notFound } from "next/navigation"
import { getCurrentUser } from "@/services/session"
import { getBlogById } from "@/services/blogs"
import { findReadingListEntry } from "@/app/services/readinglist"
import { likeBlog } from "@/actions/blogs"
import { addBlogToReadingList, removeBlogFromReadingList } from "@/actions/readinglist"
import FormButton from "@/app/components/FormButton"


const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const blog = await getBlogById(Number(id))

  if (!blog) {
    notFound()
  }

  const user = await getCurrentUser()
  let readingListEntry = undefined

  if (user)
    readingListEntry = await findReadingListEntry(blog.id)

  return (
    <div className="topdiv">
      <div className="contentdiv">
        <h2>{blog.title}</h2>
        <p className="text-textlight">by {blog.author}</p>
        <div>
          <span className="mr-4">Likes: {blog.likes}</span>
          <FormButton
            action={likeBlog}
            inputValue={blog.id}
            text="Like this blog"
            buttonClass="w-32 bg-blue-600 hover:bg-blue-400 mr-4"
          />
          { user ? (
              !readingListEntry ? (
                <FormButton
                  action={addBlogToReadingList}
                  inputValue={blog.id}
                  text="Add to reading list"
                  buttonClass="w-40 bg-green-600 hover:bg-green-400"
                />
              ) : (
                <FormButton
                  action={removeBlogFromReadingList}
                  inputValue={blog.id}
                  text="Remove from reading list"
                  buttonClass="w-48 bg-red-600 hover:bg-red-400"
                />
              )
            ) : (
              <>
              </>
            )
          }
        </div>
        {/* Not making this a link because there is no validation that the urls are valid. It wasn't explicitly required */}
        <p className="text-blue-600">
          {blog.url}
        </p>
      </div>
    </div>
  )
}

export default BlogPage