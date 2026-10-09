"use client"

import { useActionState, useEffect } from "react"
import { useRouter } from "next/navigation"

import { createBlog } from "@/actions/blogs"
import { createBlogFields } from "@/app/types"
import { titleMinLength, authorMinLength, urlMinLength} from "@/app/constants"
import FormField from "@/components/FormField"
import { useNotification } from "@/components/NotificationContext"

const NewBlog = () => {
  const [state, formAction] = useActionState(
    createBlog,
    { errors: createBlogFields(), values: createBlogFields(), success: false }
  )

  const { showNotification } = useNotification()
  const router = useRouter()

  useEffect(() => {
    if (state.success) {
      showNotification("blog created")
      router.push("/blogs")
    }
  }, [state, showNotification, router])

  return (
    <div className="topdiv">
      <h2>Create a new blog</h2>
      <form action={formAction}>
        <FormField
          label="Title"
          id="title"
          name="title"
          minLength={titleMinLength}
          defaultValue={state.values.title}
          error={state.errors.title}
        />
        <FormField
          label="Author"
          id="author"
          name="author"
          minLength={authorMinLength}
          defaultValue={state.values.author}
          error={state.errors.author}
        />
        <FormField
          label="URL"
          id="url"
          name="url"
          minLength={urlMinLength}
          defaultValue={state.values.url}
          error={state.errors.url}
        />
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default NewBlog