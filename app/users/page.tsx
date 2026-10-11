import { Suspense } from "react"

import { getUsers } from "@/services/users"
import ListItemBox from '@/components/ListItemBox'

const UserList = async () => {
  const users = await getUsers()
  return (
    <ul className="list">
      {users.map((user) => (
        <ListItemBox
          key={user.id}
          href={`/users/${user.username}`}
          text={user.name}
        />
      ))}
    </ul>
  )
}

const Users = () => {
  return (
    <div className="topdiv">
      <h2>Users</h2>
      <Suspense fallback={<p>Loading users...</p>}>
        <UserList/>
      </Suspense>
    </div>
  )
}

export default Users