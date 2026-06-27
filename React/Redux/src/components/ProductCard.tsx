import type { Product } from "../types/product";
import {addTocart} from "../features/products/cartSlice";
import {openEditProduct } from "../features/products/editproductSlice";
import {deleteProduct} from "../features/products/productSlice";
import { useAppDispatch , useAppSelector } from "../hooks/hooks";
import EditModel from "./EditModel";
interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
    const dispatch = useAppDispatch();
    const {isOpen} = useAppSelector((state) => state.editProduct);
  return (
  <>
    <div className="group overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">

      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-72 w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 backdrop-blur">
          {product.category}
        </span>

        <span className="absolute right-4 top-4 rounded-full bg-amber-400 px-3 py-1 text-xs font-bold text-white shadow">
          ⭐ {product.rating}
        </span>
      </div>

      {/* Content */}
      <div className="space-y-5 p-6">

        <div>
          <h2 className="line-clamp-1 text-2xl font-bold text-slate-900">
            {product.title}
          </h2>

          <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">
            {product.description}
          </p>
        </div>

        <div className="flex items-center justify-between rounded-2xl bg-slate-100 p-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-slate-500">
              Price
            </p>

            <h3 className="text-3xl font-extrabold text-blue-600">
              ${product.price}
            </h3>
          </div>

          <div className="rounded-xl bg-white px-4 py-2 shadow">
            <p className="text-xs text-slate-500">Stock</p>
            <p className="font-bold text-slate-800">
              {product.stock}
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-3 gap-3">

          <button
            onClick={() => dispatch(addTocart(product))}
            className="rounded-xl bg-blue-600 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700 hover:shadow-lg active:scale-95"
          >
            🛒
          </button>

          <button
            onClick={() => dispatch(openEditProduct(product))}
            className="rounded-xl bg-emerald-600 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-emerald-700 hover:shadow-lg active:scale-95"
          >
            ✏️
          </button>

          <button
            onClick={() => dispatch(deleteProduct(product.id))}
            className="rounded-xl bg-rose-600 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-rose-700 hover:shadow-lg active:scale-95"
          >
            🗑️
          </button>

        </div>
      </div>
    </div>

    {isOpen && <EditModel />}
  </>
);
 
};

export default ProductCard;