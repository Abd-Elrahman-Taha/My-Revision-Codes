import { Link } from "react-router-dom";
import { FaShoppingCart, FaSearch, FaUserCircle } from "react-icons/fa";
import { useAppSelector , useAppDispatch} from "../hooks/hooks";
import { setSearchTerm } from "../features/products/searchSlice";
import {setSortBy} from '../features/products/sortSlice';

const Navbar = () => {
  const items = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();
  
  const searchTerm = useAppSelector((state) => state.search.searchTerm);
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(event.target.value));
  }
  
  const sortBy = useAppSelector((state) => state.sort.sortBy);
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSortBy(event.target.value));
  }
  
  
  
  const totalItems = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

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
        <div className="flex items-center gap-5">
          <Link
            to="/"
            className="font-medium text-slate-700 transition hover:text-blue-600"
          >
            Home
          </Link>

          <Link
            to="/cart"
            className="relative rounded-xl bg-slate-900 p-3 text-white transition hover:bg-blue-600"
          >
            <FaShoppingCart size={20} />

            {totalItems > 0 && (
              <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                {totalItems}
              </span>
            )}
          </Link>

          <button
            type="button"
            aria-label="User profile"
            className="text-slate-700 transition hover:text-blue-600"
          >
            <FaUserCircle size={34} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;