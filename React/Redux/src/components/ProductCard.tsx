import type { Product } from "../types/product";
import {addTocart} from "../features/products/cartSlice";
import {openEditProduct } from "../features/products/editproductSlice";
import {deleteProduct} from "../features/products/productSlice";
import { useAppDispatch , useAppSelector } from "../hooks/hooks";
import EditModel from "./EditModel";
import {useNavigate} from 'react-router-dom'
import { FaCartPlus, FaEdit, FaTrash, FaStar} from "react-icons/fa";
interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
    const dispatch = useAppDispatch();
    const {isOpen} = useAppSelector((state) => state.editProduct);
    const user = useAppSelector((state) => state.auth.user);
    const navigate = useNavigate();
    const handleAddToCart = () => {
        if(!user){
            alert("Please login to add to cart");
            navigate("/login");
            return;
        }
        dispatch(addTocart(product));
    }
    return (
  <>
    <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">

      {/* Image */}
      <div className="relative h-64 overflow-hidden bg-slate-100">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <span className="absolute left-4 top-4 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white shadow">
          {product.category}
        </span>
      </div>

      {/* Body */}
      <div className="space-y-5 p-6">

        {/* Title */}
        <div>
          <h2 className="line-clamp-1 text-xl font-bold text-slate-900">
            {product.title}
          </h2>

          <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
            {product.description}
          </p>
        </div>

        {/* Rating & Stock */}
        <div className="flex items-center justify-between">

          <div className="flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-600">
            <FaStar />
            {product.rating}
          </div>

          <div className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
            
            {product.stock} in stock
          </div>

        </div>

        {/* Price */}
        <div className="flex items-end justify-between border-t border-slate-200 pt-4">

          <div>
            <p className="text-xs uppercase tracking-wider text-slate-500">
              Price
            </p>

            <h3 className="text-3xl font-extrabold text-blue-600">
              ${product.price}
            </h3>
          </div>

        </div>

        {/* Buttons */}
        <div className="grid grid-cols-3 gap-3">

          <button
          aria-label="Add to cart"
            onClick={handleAddToCart}
            className="flex items-center justify-center rounded-xl bg-blue-600 py-3 text-white transition hover:bg-blue-700"
          >
            <FaCartPlus size={18} />
          </button>

          <button
          aria-label="Edit"
            onClick={() => dispatch(openEditProduct(product))}
            className="flex items-center justify-center rounded-xl border border-emerald-600 text-emerald-600 transition hover:bg-emerald-600 hover:text-white"
          >
            <FaEdit size={18} />
          </button>

          <button
            type="button"
            aria-label="Delete"
            onClick={() => dispatch(deleteProduct(product.id))}
            className="flex items-center justify-center rounded-xl border border-red-500 text-red-500 transition hover:bg-red-500 hover:text-white"
          >
            <FaTrash size={18} />
          </button>

        </div>

      </div>
    </div>

    {isOpen && <EditModel />}
  </>
);
 
};

export default ProductCard;