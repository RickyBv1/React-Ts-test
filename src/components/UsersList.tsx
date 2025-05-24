import { SortBy, type User } from "../types.d";

interface Props {
  changeSorting: (sortBy: SortBy) => void;
  deleteUser: (email: string) => void;
  showColors: boolean;
  users: User[];
}
export function UsersList({
  changeSorting,
  deleteUser,
  showColors,
  users,
}: Props) {
  return (
    <table width={"100%"}>
      <thead>
        <tr>
          <th>Picture</th>
          <th
            className="pointer"
            onClick={() => {
              changeSorting(SortBy.NAME);
            }}
          >
            Name
          </th>
          <th
            className="pointer"
            onClick={() => {
              changeSorting(SortBy.LAST);
            }}
          >
            Last name
          </th>
          <th
            className="pointer"
            onClick={() => {
              changeSorting(SortBy.COUNTRY);
            }}
          >
            Country
          </th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody className={showColors ? "table--showColors" : ""}>
        {users.map((user) => {
          return (
            <tr key={user.email}>
              <td>
                <img src={user.picture.thumbnail} alt="thumbnail" />
              </td>
              <td>{user.name.first}</td>
              <td>{user.name.last}</td>
              <td>{user.location.country}</td>
              <td>
                <button onClick={() => deleteUser(user.email)}>Delete</button>
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
