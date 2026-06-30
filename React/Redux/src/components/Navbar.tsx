import { Link } from "react-router-dom";
import { FaShoppingCart, FaSearch, FaUserCircle } from "react-icons/fa";
import { HiHome ,HiArrowRightOnRectangle  } from "react-icons/hi2";
import { useAppSelector , useAppDispatch} from "../hooks/hooks";
import { setSearchTerm } from "../features/products/searchSlice";
import {setSortBy} from '../features/products/sortSlice';
import {logout} from '../features/products/auth/authSlice';
import { clearCart } from "../features/products/cartSlice";

const Navbar = () => {
  const items = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();
  const {user} = useAppSelector((state) => state.auth);
  const searchTerm = useAppSelector((state) => state.search.searchTerm);
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(event.target.value));
  }
  const sortBy = useAppSelector((state) => state.sort.sortBy);
  const totalItems = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-lg">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-black tracking-tight text-slate-900"
        >
          Shop<span className="text-blue-600">X</span>
        </Link>

        {/* Search */}
        <div className="relative hidden w-full max-w-md lg:block">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full rounded-xl border border-slate-300 bg-slate-50 py-3 pl-11 pr-4 outline-none transition focus:border-blue-500 focus:bg-white"
          />
        </div>
        <select
  name="sort"
  aria-label="Sort products"
  value={sortBy}
  onChange={(e) => dispatch(setSortBy(e.target.value))}
  className="rounded-lg border border-slate-300 p-2"
>
    <option value="default">Default</option>
  <option value="price-asc">Price: Low to High</option>
  <option value="price-desc">Price: High to Low</option>
  <option value="rating-asc">Rating: Low to High</option>
  <option value="rating-desc">Rating: High to Low</option>
</select>

        {/* Right Side */}
       <div className="flex items-center gap-3">
  {/* Home */}
  <Link
    to="/"
    className="rounded-xl p-3 text-slate-700 transition hover:bg-slate-100 hover:text-blue-600"
  >
    <HiHome size={22} />
  </Link>

  {/* Cart */}
  <Link
    to="/cart"
    className="relative rounded-xl p-3 text-slate-700 transition hover:bg-slate-100 hover:text-blue-600"
  >
    <FaShoppingCart size={22} />

    {totalItems > 0 && (
      <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
        {totalItems}
      </span>
    )}
  </Link>

  {/* Login / Logout */}
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
      className="rounded-xl p-3 text-slate-700 transition hover:bg-slate-100 hover:text-blue-600"
    >
      <FaUserCircle size={22} />
    </Link>
  )}
</div>
      </div>
    </header>
  );
};

export default Navbar;