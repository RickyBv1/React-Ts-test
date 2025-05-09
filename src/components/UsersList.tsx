import { type User } from "../types.d";

interface Props {
  users: User[];
}
export function UsersList({ users }: Props) {
  return (
    <table width={"100%"}>
      <thead>
        <th>Picture</th>
        <th>Name</th>
        <th>Last name</th>
        <th>Country</th>
        <th>Actions</th>
      </thead>

      <tbody>
        {users.map((user) => {
          return (
            <tr key={user.id.value}>
              <td>
                <img src={user.picture.thumbnail} alt="User profile picture" />
              </td>
              <td>{user.name.first}</td>
              <td>{user.name.last}</td>
              <td>{user.location.country}</td>
              <td>
                <button>Delete</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

//table, thead, tbody
//tr -> row
//td -> cell
