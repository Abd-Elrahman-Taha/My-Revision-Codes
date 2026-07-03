import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaShoppingCart,
  FaSearch,
  FaUserCircle,
} from "react-icons/fa";
import {
  HiHome,
  HiArrowRightOnRectangle,
  HiBars3,
  HiXMark,
  HiShoppingBag,
} from "react-icons/hi2";
import { SiShopify } from "react-icons/si";


import { useAppSelector, useAppDispatch } from "../hooks/hooks";
import { setSearchTerm } from "../features/products/searchSlice";
import { setSortBy } from "../features/products/sortSlice";
import { logout } from "../features/products/auth/authSlice";
import { clearCart } from "../features/products/cartSlice";
import { LuLayoutDashboard, LuListChecks, LuTruck } from "react-icons/lu";

const Navbar = () => {
  const dispatch = useAppDispatch();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const items = useAppSelector((state) => state.cart.items);
  const { user } = useAppSelector((state) => state.auth);
  const searchTerm = useAppSelector((state) => state.search.searchTerm);
  const sortBy = useAppSelector((state) => state.sort.sortBy);

  const totalItems = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    setIsMenuOpen(false);
  };

  return (
    <header className="navbar sticky top-0 z-50 border-b border-slate-200  backdrop-blur-lg shadow-sm">
      <div className="mx-auto max-w-7xl px-4">

        {/* ================= Desktop ================= */}
        <div className="hidden h-20 items-center justify-between md:flex">

          {/* Logo */}
          <Link
  to="/"
  className="flex items-center gap-2 text-3xl font-black tracking-tight text-slate-900"
>
  <SiShopify className="text-[#72470a] text-4xl" />
  <span>
    Shop<span className="text-[#72470a]">X</span>
  </span>
</Link>

          {/* Search */}
          <div className="relative w-full max-w-md">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) =>
                dispatch(setSearchTerm(e.target.value))
              }
              className="w-full rounded-xl border border-slate-300 bg-[#F8F5F0] py-3 pl-11 pr-4 outline-none transition focus:border-[#D4C4AD] focus:bg-white"
            />
          </div>

          {/* Sort */}
          <select
          aria-label="Sort"
            value={sortBy}
            onChange={(e) =>
              dispatch(setSortBy(e.target.value))
            }
            className="rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-[#D4C4AD] focus:bg-[#F8F5F0] hover:bg-[#F8F5F0] transition"
          >
            <option value="default">Default</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="rating-asc">Rating: Low → High</option>
            <option value="rating-desc">Rating: High → Low</option>
          </select>

          {/* Desktop Icons */}
          <div className="flex items-center gap-3">

            <Link
              to="/"
              className="rounded-xl p-3 text-slate-700 transition hover:bg-slate-100 hover:text-[#8A735A]"
            >
              <HiHome size={22} />
            </Link>
             <Link
  to="/shop"
  className="rounded-xl p-3 text-slate-700 transition hover:bg-slate-100 hover:text-[#8A735A]"
>
  <HiShoppingBag size={22} />
  </Link>
            <Link
              to="/cart"
              className="relative rounded-xl p-3 text-slate-700 transition hover:bg-slate-100 hover:text-[#8A735A]"
            >
              <FaShoppingCart size={22} />

              {totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                  {totalItems}
                </span>
              )}
            </Link>

            
            {user && user.role === "admin" && (
              <Link to="/dashboard" className="rounded-xl p-3 text-slate-700 transition hover:bg-slate-100 hover:text-[#8A735A]">
                <LuLayoutDashboard size={22} />
              </Link>
              
            )}
        <div className="group relative">
  <button
    type="button"
    aria-label="Profile"
    className="rounded-xl p-3 text-slate-700 transition hover:bg-slate-100 hover:text-[#8A735A]"
  >
    <FaUserCircle size={22} />
  </button>

  {/* Invisible bridge to prevent flickering */}
  <div className="absolute right-0 top-full h-3 w-56" />

  <div className="invisible absolute right-0 top-full mt-3 w-56 overflow-hidden rounded-2xl border border-slate-200 bg-white opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
    {user ? (
      <>
        <div className="border-b px-5 py-4">
          <p className="font-semibold">{user.firstName}</p>
          <p className="text-sm text-slate-500">
            {user.role}
          </p>
        </div>

        <Link
          to="/orders"
          className="flex items-center gap-3 px-5 py-4 transition hover:bg-slate-100"
        >
          <LuListChecks size={20} />
          My Orders
        </Link>

        <Link
          to="/tracking"
          className="flex items-center gap-3 px-5 py-4 transition hover:bg-slate-100"
        >
          <LuTruck size={20} />
          Track Orders
        </Link>

        {user.role === "admin" && (
          <Link
            to="/dashboard"
            className="flex items-center gap-3 px-5 py-4 transition hover:bg-slate-100"
          >
            <LuLayoutDashboard size={20} />
            Dashboard
          </Link>
        )}

        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 px-5 py-4 text-red-600 transition hover:bg-red-50"
        >
          <HiArrowRightOnRectangle size={20} />
          Logout
        </button>
      </>
    ) : (
      <Link
        to="/login"
        className="flex items-center gap-3 px-5 py-4 transition hover:bg-slate-100"
      >
        <FaUserCircle size={20} />
        Login
      </Link>
    )}
  </div>
</div>
          </div>
        </div>

        {/* ================= Mobile ================= */}

        <div className="md:hidden">

          {/* Top Row */}
          <div className="flex h-16 items-center justify-between">

                <Link
  to="/"
  className="flex items-center gap-2 text-3xl font-black tracking-tight text-slate-900"
>
  <SiShopify className="text-[#72470a] text-4xl" />
  <span>
    Shop<span className="text-[#8A735A]">X</span>
  </span>
</Link>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="rounded-xl p-2 hover:bg-slate-100"
            >
              {isMenuOpen ? (
                <HiXMark size={28} />
              ) : (
                <HiBars3 size={28} />
              )}
            </button>
          </div>

          {/* Search */}
          <div className="relative pb-3">
            <FaSearch className="absolute left-4 top-4 text-slate-400" />

            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) =>
                dispatch(setSearchTerm(e.target.value))
              }
              className="w-full rounded-xl border border-slate-300 bg-[#F8F5F0] py-3 pl-11 pr-4 outline-none focus:border-[#D4C4AD]"
            />
          </div>

          {/* Sort */}
          <div className="pb-3">
            <select
              name="sortBy"
              aria-label="Sort by"
              value={sortBy}
              onChange={(e) =>
                dispatch(setSortBy(e.target.value))
              }
              className="w-full rounded-xl border border-slate-300 bg-white p-3 outline-none focus:border-[#D4C4AD]"
            >
              <option value="default">Default</option>
              <option value="price-asc">
                Price: Low → High
              </option>
              <option value="price-desc">
                Price: High → Low
              </option>
              <option value="rating-asc">
                Rating: Low → High
              </option>
              <option value="rating-desc">
                Rating: High → Low
              </option>
            </select>
          </div>

          {/* Dropdown */}
         <div
  className={`overflow-hidden transition-all duration-300 ease-in-out ${
    isMenuOpen
      ? "max-h-96 opacity-100 mt-2"
      : "max-h-0 opacity-0"
  }`}
>
  <div className="mb-4 rounded-2xl border border-slate-200 bg-white shadow-lg">

      <Link
  to="/"
  onClick={() => setIsMenuOpen(false)}
  className="flex items-center gap-3 px-5 py-4 transition hover:bg-slate-100"
>
  <HiHome size={22} />
  Home
</Link>

<Link
  to="/shop"
  onClick={() => setIsMenuOpen(false)}
  className="flex items-center gap-3 px-5 py-4 transition hover:bg-slate-100"
>
  <HiShoppingBag size={22} />
  Shop
</Link>

 

    <Link
      to="/cart"
      onClick={() => setIsMenuOpen(false)}
      className="flex items-center justify-between px-5 py-4 transition hover:bg-slate-100"
    >
      <div className="flex items-center gap-3">
        <FaShoppingCart />
        Cart
      </div>
      

      {totalItems > 0 && (
        <span className="rounded-full bg-red-500 px-2 py-1 text-xs text-white">
          {totalItems}
        </span>
      )}
    </Link>
    {/* Orders */}
<Link
  to="/orders"
  onClick={() => setIsMenuOpen(false)}
  className="flex items-center gap-3 px-5 py-4 transition hover:bg-slate-100"
>
  <LuListChecks size={22} />
  My Orders
</Link>

{/* Tracking */}
<Link
  to="/tracking"
  onClick={() => setIsMenuOpen(false)}
  className="flex items-center gap-3 px-5 py-4 transition hover:bg-slate-100"
>
  <LuTruck size={22} />
  Track Orders
</Link>
      {user && (
  <Link
    to="/dashboard"
    onClick={() => setIsMenuOpen(false)}
    className="flex items-center gap-3 px-5 py-4 transition hover:bg-slate-100"
  >
    <LuLayoutDashboard size={22} />
    Dashboard
  </Link>
)}
   {user ? (
  <Link
    to="/"
    onClick={handleLogout}
    className="flex items-center gap-3 px-5 py-4 text-red-600 transition hover:bg-red-50"
  >
    <HiArrowRightOnRectangle size={22} />
    Logout
  </Link>
) : (
  <Link
    to="/login"
    onClick={() => setIsMenuOpen(false)}
    className="flex items-center gap-3 px-5 py-4 transition hover:bg-slate-100"
  >
    <FaUserCircle size={20} />
    Login
  </Link>
)}
  </div>
</div>

        </div>
      </div>
    </header>
  );
};

export default Navbar;