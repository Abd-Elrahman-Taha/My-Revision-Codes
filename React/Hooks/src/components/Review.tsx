import { useState, useRef, useEffect, useContext } from "react";
import { ThemeContext } from "../App";

interface User {
  id: number;
  name: string;
  age: number;
}

export default function Review() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);

  const renderCount = useRef(0);

  const { theme, setTheme } = useContext(ThemeContext);

  useEffect(() => {
    renderCount.current += 1;
  });

  function toggleTheme() {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }

  function addUser() {
    setUsers((prev) => [
      ...prev,
      {
        id: Date.now(),
        name,
        age,
      },
    ]);

    setName("");
    setAge(0);
  }

  function removeUser(id: number) {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  }

  return (
    <div className={theme}>
      <h1>Review</h1>

      <button onClick={toggleTheme}>Toggle Theme</button>

      <input
        type="text"
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="number"
        placeholder="age"
        value={age}
        onChange={(e) => setAge(Number(e.target.value))}
      />

      <button onClick={addUser}>Add</button>

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.age}
            <button onClick={() => removeUser(user.id)}>Remove</button>
          </li>
        ))}
      </ul>

      <p>Render: {renderCount.current}</p>
    </div>
  );
}