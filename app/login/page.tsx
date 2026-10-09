"use client"

import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"

import FormField from "@/components/FormField"
import { useNotification } from "@/components/NotificationContext"

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState("")

  const { showNotification } = useNotification()

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const result = await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirect: false,
    })

    if (result?.error) {
      setError("Invalid username or password")
    } else {
      showNotification("login success")
      router.push("/")
      router.refresh()
    }
  }

  return (
    <div className="topdiv">
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <FormField
          label="Username"
          id="username"
          name="username"
        />
        <FormField
          label="Password"
          id="password"
          name="password"
          itype="password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}