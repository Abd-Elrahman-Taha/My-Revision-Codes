import {useEffect,useState} from "react";
import {useAppDispatch, useAppSelector} from "../hooks/hooks.ts";
import {fetchProducts} from "../features/products/productSlice.ts";
import ProductCard from "../components/ProductCard.tsx";

const Home = () => {
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
  <main className="min-h-screen bg-slate-100">
    <div className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="mb-8 text-4xl font-bold text-slate-800">
        Our Products
      </h1>

      {loading === "pending" && (
        <div className="flex justify-center py-20">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
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
      <div className="mt-10 flex items-center justify-center gap-4">
  <button
    onClick={() => setCurrentPage((prev) => prev - 1)}
    disabled={currentPage === 1}
    className={`rounded-lg px-5 py-2 font-medium transition ${
      currentPage === 1
        ? "cursor-not-allowed bg-gray-300 text-gray-500"
        : "bg-blue-500 text-white hover:bg-blue-600"
    }`}
  >
    Previous
  </button>

  <span className="font-medium text-slate-700">
    Page {currentPage} of {totalPages}
  </span>

  <button
    onClick={() => setCurrentPage((prev) => prev + 1)}
    disabled={currentPage === totalPages}
    className={`rounded-lg px-5 py-2 font-medium transition ${
      currentPage === totalPages
        ? "cursor-not-allowed bg-gray-300 text-gray-500"
        : "bg-blue-500 text-white hover:bg-blue-600"
    }`}
  >
    Next
  </button>
</div>
    </div>
  </main>
);
}

export default Home