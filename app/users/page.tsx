import { getUsers } from "@/services/users"
import ListItemBox from '@/components/ListItemBox'

const Users = async () => {
  const users = await getUsers()

  return (
    <div className="topdiv">
      <h2>Users</h2>
      <ul className="list">
        {users.map((user) => (
          <ListItemBox
            key={user.id}
            href={`/users/${user.username}`}
            text={user.name}
          />
        ))}
      </ul>
    </div>
  )
}

export default Users