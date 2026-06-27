import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../hooks/hooks.ts";
import {fetchProducts} from "../features/products/productSlice.ts";
import ProductCard from "../components/ProductCard.tsx";

const Home = () => {
    const dispatch = useAppDispatch();
    const {products, loading, error} = useAppSelector((state) => state.product);

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
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  </main>
);
}

export default Home