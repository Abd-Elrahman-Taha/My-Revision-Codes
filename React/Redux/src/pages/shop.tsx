import {useEffect,useState} from "react";
import {useAppDispatch, useAppSelector} from "../hooks/hooks.ts";
import {fetchProducts} from "../features/products/productSlice.ts";
import ProductCard from "../components/ProductCard.tsx";

const Shop = () => {
    const dispatch = useAppDispatch();
    const {products, loading, error} = useAppSelector((state) => state.product);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const sortOrder = useAppSelector((state) => state.sort.sortBy);
    const searchTerm = useAppSelector((state) => state.search.searchTerm);
    const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const sortedProducts = [...filteredProducts];

    switch (sortOrder) {
        case "price-asc":
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
        case "price-desc":
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
        case "rating-asc":
            sortedProducts.sort((a, b) => a.rating - b.rating);
            break;
        case "rating-desc":
            sortedProducts.sort((a, b) => b.rating - a.rating);
            break;
        default:
            break;
    }
    const currentProducts = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    return (
<main className="body min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="products mb-8 text-4xl font-extrabold text-text">
  Our Products
</h1>

      {loading === "pending" && (
        <div className="flex justify-center py-20">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#D4C4AD] border-t-transparent"></div>
        </div>
      )}

      {error && (
        <div className="rounded-lg bg-red-100 p-4 text-red-600">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {currentProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
      <div className="mt-12 flex flex-col items-center justify-between gap-4 sm:flex-row">
  <button
    onClick={() => setCurrentPage((prev) => prev - 1)}
    disabled={currentPage === 1}
    className={`rounded-xl px-6 py-3 font-semibold transition-all duration-300 ${
      currentPage === 1
        ? "cursor-not-allowed bg-slate-200 text-slate-400"
        : "bg-primary text-text hover:bg-primary-hover hover:shadow-lg border"
    }`}
  >
    ← Previous
  </button>

  <div className="rounded-xl border border-border bg-white px-6 py-3 shadow-sm">
    <span className="font-semibold text-text">
      Page{" "}
      <span className="text-secondary">{currentPage}</span>
      {" "}of{" "}
      <span className="text-secondary">{totalPages}</span>
    </span>
  </div>

  <button
    onClick={() => setCurrentPage((prev) => prev + 1)}
    disabled={currentPage === totalPages}
    className={`rounded-xl px-6 py-3 font-semibold transition-all duration-300 ${
      currentPage === totalPages
        ? "cursor-not-allowed bg-slate-200 text-slate-400"
        : "bg-primary text-text hover:bg-primary-hover hover:shadow-lg border"
    }`}
  >
    Next →
  </button>
</div>
    </div>
  </main>
);
}

export default Shop