import { useEffect, useState } from "react";
import "./App.css";
import { UsersList } from "./components/UsersList";
import type { User } from "./types.d";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [showColors, setShowColors] = useState(false);
  const [sortByCountry, setSortByCountry] = useState(false);

  const toggleColors = () => {
    setShowColors(!showColors);
  };

  const toggleSortByCountry = () => {
    setSortByCountry(!sortByCountry);
  };

  const sortedUsers = sortByCountry
    ? users.toSorted((a, b) => {
        return a.location.country.localeCompare(b.location.country);
      })
    : users;

  useEffect(() => {
    fetch("https://randomuser.me/api?results=100")
      .then(async (res) => await res.json())
      .then((res) => {
        setUsers(res.results);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <>
      <h1>Technical Test</h1>
      <header>
        <button onClick={toggleColors}>Color rows</button>
        <button onClick={toggleSortByCountry} style={{ marginLeft: "10px" }}>
          {sortByCountry ? "Stop sorting by country" : "Sort by country"}
        </button>
      </header>
      <main>
        <UsersList showColors={showColors} users={sortedUsers} />
      </main>
    </>
  );
}

export default App;
