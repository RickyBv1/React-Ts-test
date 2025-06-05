import { useMemo, useState } from "react";
import "./App.css";
import { UsersList } from "./components/UsersList";
import { SortBy, type User } from "./types.d";
import { useUsers } from "./hooks/useUsers";
import { Results } from "./components/Results";

function App() {
  const { isLoading, isError, users, refetch, fetchNextPage, hasNextPage } =
    useUsers();

  const [showColors, setShowColors] = useState(false);
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE);
  const [filterCountry, setFilterCountry] = useState<string | null>(null);

  const toggleColors = () => {
    setShowColors(!showColors);
  };

  const toggleSortByCountry = () => {
    const newSortingValue =
      sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE;
    setSorting(newSortingValue);
  };

  const handleReset = () => {
    void refetch();
  };

  const handleDelete = (email: string) => {
    // const filteredUsers = users.filter((user) => user.email !== email);
    // setUsers(filteredUsers);
  };

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort);
  };

  const filteredUsers = useMemo(() => {
    return filterCountry != null && filterCountry.length > 0
      ? users.filter((user) => {
          return user.location.country
            .toLowerCase()
            .includes(filterCountry.toLowerCase());
        })
      : users;
  }, [users, filterCountry]);

  const sortedUsers = useMemo(() => {
    if (sorting === SortBy.NONE) return filteredUsers;

    const compareProperties: Record<string, (user: User) => string> = {
      [SortBy.COUNTRY]: (user) => user.location.country,
      [SortBy.NAME]: (user) => user.name.first,
      [SortBy.LAST]: (user) => user.name.last,
    };

    return filteredUsers.toSorted((a, b) => {
      const extractProperty = compareProperties[sorting];
      return extractProperty(a).localeCompare(extractProperty(b));
    });
  }, [filteredUsers, sorting]);

  return (
    <div className="App">
      <h1>Technical Test</h1>
      <Results />
      <header>
        <button onClick={toggleColors}>Color rows</button>

        <button onClick={toggleSortByCountry}>
          {sorting === SortBy.COUNTRY
            ? "Stop sorting by country"
            : "Sort by country"}
        </button>

        <button onClick={handleReset}>Undo delete</button>

        <input
          placeholder="Filter by country"
          onChange={(e) => {
            setFilterCountry(e.target.value);
          }}
        />
      </header>

      <main>
        {users.length > 0 && (
          <UsersList
            changeSorting={handleChangeSort}
            deleteUser={handleDelete}
            showColors={showColors}
            users={sortedUsers}
          />
        )}

        {isLoading && <strong>Loading...</strong>}

        {isError && <p>Error loading users</p>}

        {!isLoading && !isError && users.length === 0 && <p>No users found</p>}

        {!isLoading && !isError && hasNextPage === true && (
          <button
            onClick={() => {
              void fetchNextPage();
            }}
          >
            Load more results
          </button>
        )}

        {!isLoading && !isError && hasNextPage === false && (
          <p>No more results</p>
        )}
      </main>
    </div>
  );
}

export default App;
