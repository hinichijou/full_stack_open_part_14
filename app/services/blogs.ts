const blogs = [
  { id: 1, title: "blog1", author: "I", url: "https://github.com/hinichijou/full_stack_open_part_14", likes: 1 },
  { id: 2, title: "blog2", author: "He", url: "https://github.com/hinichijou/full_stack_open_part_14", likes: 2 },
  { id: 3, title: "blog3", author: "They", url: "https://github.com/hinichijou/full_stack_open_part_14", likes: 1000 },
]

let nextId = 4

export const getBlogs = () => {
  return blogs
}

export const addBlog = (title: string, author: string, url: string ) => {
  blogs.push({ id: nextId++, title, author, url, likes: 0 })
}

export const getBlogById = (id: number) => {
  return blogs.find((blog) => blog.id === id)
}