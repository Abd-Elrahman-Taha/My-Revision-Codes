import ProductCard from "../components/ProductCard";
import { useContext, useState ,useEffect } from "react";
import ProductContext from "../Context";
import AddNew from "../components/AddNew";
import "../App.css";

export default function Store() {
  const context = useContext(ProductContext);
  

  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("");
  if (!context) return null;
  const { products, setProducts , api } = context;
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchedProducts = async () => {
      
      if(search.trim() === ""){
        setFilteredProducts(products);
        return;
      }
      
      try {
        const response = await fetch(`${api}/products/search?q=${search}`);
        const data = await response.json();
        setFilteredProducts(data.products);
        setCurrentPage(1); // Reset to first page when search changes
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchedProducts();
  }, [search]);

     
      let sortedProducts = [...filteredProducts];
if (sortBy === "price-low") {
  sortedProducts.sort((a, b) => a.price - b.price);}

if (sortBy === "price-high") {
  sortedProducts.sort((a, b) => b.price - a.price);}

if (sortBy === "rate") {
  sortedProducts.sort((a, b) => b.rating.rate - a.rating.rate);}

if (sortBy === "az") {
  sortedProducts.sort((a, b) =>
    a.title.localeCompare(b.title));}
  
      const endIndex = currentPage  * itemsPerPage;
      const startIndex = endIndex - itemsPerPage;
      const currentProducts = sortedProducts.slice(startIndex, endIndex);
      const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
     
  
  
      return (
    <div className="container mx-auto px-4 py-10">
      <select
      aria-label="Sort products"
  value={sortBy}
  onChange={(e) => setSortBy(e.target.value)}
  className="
    mb-6
    px-4 py-3
    rounded-xl
    bg-[#111]
    text-white
    border border-gray-700
    outline-none
  "
>
  <option value="">No Sorting</option>
  <option value="price-low">Price: Low → High</option>
  <option value="price-high">Price: High → Low</option>
  <option value="rate">Top Rated</option>
  <option value="az">A → Z</option>
</select>
      
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full
            px-10
            py-3
            rounded-xl
            bg-[#111]
            text-white
            border border-gray-700
            outline-none
            transition-all duration-300
            focus:border-[#D4C4AD]
            focus:shadow-[0_0_10px_rgba(59,130,246,0.5)]
          "
        />

        
      </div>

      
      <div className="grid grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-6">
        {currentProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={(id, updatedProduct) => {
              const updatedProducts = products.map((p) =>
                p.id === id ? { ...p, ...updatedProduct } : p
              );

              setProducts(updatedProducts);
            }}
            onDelte={(id) =>
              setProducts(products.filter((p) => p.id !== id))
            }
          />
        ))}
      </div>
        <div className="flex justify-center items-center gap-3 mt-8">
  
  {/* Prev */}
  <button
    onClick={() => setCurrentPage((prev) => prev - 1)}
    disabled={currentPage === 1}
    className="
      px-4 py-2 rounded-lg border
      bg-black text-white border-gray-600
      disabled:opacity-40 disabled:cursor-not-allowed
      hover:bg-gray-800 transition
    "
  >
    Prev
  </button>

  {/* Page Info */}
  <span className="text-white">
    Page {currentPage} of {totalPages}
  </span>

  {/* Next */}
  <button
    onClick={() => setCurrentPage((prev) => prev + 1)}
    disabled={currentPage === totalPages}
    className="
      px-4 py-2 rounded-lg border
      bg-black text-white border-gray-600
      disabled:opacity-40 disabled:cursor-not-allowed
      hover:bg-gray-800 transition
    "
  >
    Next
  </button>
</div>
  
      <AddNew
        onAdd={(product) => setProducts([...products, product])}
      />
    </div>
  );
}