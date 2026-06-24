import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthContext";

export default function Navbar() {
  const auth = useContext(AuthContext);

  if (!auth) return null;

  const { token, logout } = auth;

  return (
    <nav className="bg-black text-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">

        <Link to="/">
          <h1 className="text-2xl font-bold">MyStore</h1>
        </Link>

        <div className="flex gap-6 items-center">

          <Link to="/">Home</Link>
          <Link to="/store">Store</Link>
          <Link to="/cart">Cart</Link>

          {!token ? (
            <Link to="/login">Login</Link>
          ) : (
            <>
              <Link to="/profile">Profile</Link>

              <button onClick={logout} className="text-red-400">
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}