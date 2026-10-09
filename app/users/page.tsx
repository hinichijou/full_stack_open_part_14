import Link from "next/link"
import { getUsers } from "@/services/users"

const Users = async () => {
  const users = await getUsers()

  return (
    <div className="topdiv">
      <h2>Users</h2>
      <ul className="list">
        {users.map((user) => (
          <li key={user.id} className="listitembox">
            <Link href={`/users/${user.username}`} className="listitem">{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Users