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


import { useAppSelector, useAppDispatch } from "../hooks/hooks";
import { setSearchTerm } from "../features/products/searchSlice";
import { setSortBy } from "../features/products/sortSlice";
import { logout } from "../features/products/auth/authSlice";
import { clearCart } from "../features/products/cartSlice";
import { LuLayoutDashboard } from "react-icons/lu";

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
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-lg shadow-sm">
      <div className="mx-auto max-w-7xl px-4">

        {/* ================= Desktop ================= */}
        <div className="hidden h-20 items-center justify-between md:flex">

          {/* Logo */}
          <Link
            to="/"
            className="text-3xl font-black tracking-tight text-slate-900"
          >
            Shop<span className="text-[#8A735A]">X</span>
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

            {user ? (
              <button 
                type="button"
                aria-label="Logout"
                onClick={handleLogout}
                className="rounded-xl p-3 text-slate-700 transition hover:bg-red-100 hover:text-red-600"
              >
                <HiArrowRightOnRectangle size={22} />
              </button>
            ) : (
              <Link
                to="/login"
                className="rounded-xl p-3 text-slate-700 transition hover:bg-slate-100 hover:text-[#8A735A]"
              >
                <FaUserCircle size={22} />
              </Link>
            )}
            {user && <Link to="/dashboard" className="rounded-xl p-3 text-slate-700 transition hover:bg-slate-100 hover:text-[#8A735A]">
              <LuLayoutDashboard size={22} />
            </Link>}
          </div>
        </div>

        {/* ================= Mobile ================= */}

        <div className="md:hidden">

          {/* Top Row */}
          <div className="flex h-16 items-center justify-between">

            <Link
              to="/"
              className="text-3xl font-black text-slate-900"
            >
              Shop<span className="text-[#8A735A]">X</span>
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
      <button
        onClick={handleLogout}
        className="flex w-full items-center gap-3 px-5 py-4 transition hover:bg-red-50"
      >
        <HiArrowRightOnRectangle size={22} />
        Logout
      </button>
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