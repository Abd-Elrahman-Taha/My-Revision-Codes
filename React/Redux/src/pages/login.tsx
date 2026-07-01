import {useAppDispatch, useAppSelector} from "../hooks/hooks.ts";
import {loginUser} from "../features/products/auth/authThunk.ts";
import {useNavigate , Link} from "react-router-dom";
import { useState , useEffect } from "react";
import {loadCart} from "../features/products/cartSlice.ts";

const Login = () => {
    const dispatch = useAppDispatch();
    const {user, loading, error} = useAppSelector((state) => state.auth);
    const navigate = useNavigate();
    const [formData , setFormData] = useState({username:"" , password:""})
    useEffect(() => {
    if (user) {
        const savedCart = localStorage.getItem(
            `cart-${user.id}`
        );

        dispatch(
            loadCart(
                savedCart ? JSON.parse(savedCart) : []
            )
        );

        navigate("/");
    }
}, [user]);
    
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) =>{
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(loginUser(formData));
    }

    console.log("user", user?.role);

return(
    <>
     <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="mb-2 text-center text-3xl font-bold">
          Welcome Back
        </h1>

        <p className="mb-8 text-center text-slate-500">
          Login to your account
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div>
            <label className="mb-2 block font-medium">
              Username
            </label>

            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-[#D4C4AD]"
              required
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-[#D4C4AD]"
              required
            />
          </div>

          {error && (
            <div className="rounded-lg bg-red-100 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading === "pending"}
            className="w-full rounded-lg bg-[#D4C4AD] py-3 font-semibold text-white transition hover:bg-[#BDA88B] disabled:cursor-not-allowed disabled:bg-blue-400"
          >
            {loading === "pending"
              ? "Logging in..."
              : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-slate-500">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-semibold text-[#8A735A] hover:underline"
          >
            Sign Up
          </Link>
        </p>

        <div className="mt-8 rounded-lg bg-slate-100 p-4 text-sm">
          <p className="mb-2 font-semibold">
            DummyJSON Test Account
          </p>

          <p>
            Username: <strong>emilys</strong>
          </p>

          <p>
            Password: <strong>emilyspass</strong>
          </p>
        </div>
      </div>
    </main>
    </>
)
};
export default Login