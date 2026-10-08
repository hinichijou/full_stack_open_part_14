"use client"

import { useActionState } from "react"

import { registerUser } from "@/actions/users"
import FormField from "@/components/FormField"
import { createUserFields } from "@/app/types"
import { usernameMinLength, passwordMinLength} from "@/app/constants"

export default function RegisterPage() {
  const [state, formAction] = useActionState(registerUser, { errors: createUserFields(), values: createUserFields() })

  return (
    <div>
      <h2>Register</h2>
      <form action={formAction}>
        <FormField
          label="Username"
          id="username"
          name="username"
          minLength={usernameMinLength}
          defaultValue={state.values.username}
          error={state.errors.username}
        />
        <FormField
          label="Name"
          id="name"
          name="name"
          minLength={0}
          defaultValue={state.values.name}
          error={state.errors.name}
        />
        <FormField
          label="Password"
          id="password"
          name="password"
          minLength={passwordMinLength}
          defaultValue={state.values.password}
          error={state.errors.password}
          itype="password"
        />
        <FormField
          label="Confirm password"
          id="passwordConfirm"
          name="passwordConfirm"
          minLength={passwordMinLength}
          defaultValue={state.values.passwordConfirm}
          error={state.errors.passwordConfirm}
          itype="password"
        />
        <button type="submit">Register</button>
      </form>
    </div>
  )
}