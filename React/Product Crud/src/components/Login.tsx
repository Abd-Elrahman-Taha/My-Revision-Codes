import { useState, useContext } from "react";
import {useNavigate} from 'react-router-dom'
import ProductContext from "../Context";
import {AuthContext} from '../AuthContext'

export default function Login() {
  const context = useContext(ProductContext);
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  if (!context) {
    throw new Error("ProductContext is not available. Wrap App with ProductProvider");
  }

  const { api } = context;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${api}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: email, 
          password,
        }),
      });
    const data = await response.json()
      if (!response.ok) {
        setError("Login failed");
        return;
      }

      auth?.login(data.token);
      
      navigate("/store");
        window.location.reload();
      ;
      console.log("Login success:", data);

     
      

    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <form
        onSubmit={handleLogin}
        className="bg-white text-black p-6 rounded-lg shadow-md w-80"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>

        <input
          type="text"
          placeholder="Username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 mb-3 rounded text-black"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 mb-3 rounded text-black"
        />

        {error && (
          <p className="text-red-500 text-sm mb-3">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}