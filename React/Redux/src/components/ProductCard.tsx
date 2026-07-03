import type { Product } from "../types/product";
import {addTocart} from "../features/products/cartSlice";
import {openEditProduct } from "../features/products/editproductSlice";
import {deleteProduct} from "../features/products/productSlice";
import { useAppDispatch , useAppSelector } from "../hooks/hooks";
import EditModel from "./EditModel";
import {useNavigate} from 'react-router-dom'
import { FaCartPlus, FaEdit, FaTrash, FaStar} from "react-icons/fa";
import { useRef } from "react";
import { toast } from "react-hot-toast";
interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
    const dispatch = useAppDispatch();
    const {isOpen} = useAppSelector((state) => state.editProduct);
    const {user} = useAppSelector((state) => state.auth);
    const navigate = useNavigate();

    const cardRef = useRef<HTMLDivElement>(null);

const handleMouseMove = (e: React.MouseEvent) => {
  const card = cardRef.current;
  if (!card) return;

  const rect = card.getBoundingClientRect();

  const intensity = 5; // قوة الانحناء

  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const normalizedX = (x / rect.width - 0.5) * 2;
  const normalizedY = (y / rect.height - 0.5) * 2;

  const rotateY = normalizedX * intensity;
  const rotateX = -normalizedY * intensity;

card.style.setProperty("--mouse-x", `${x}px`);
card.style.setProperty("--mouse-y", `${y}px`);

card.style.setProperty("--rotate-x", `${rotateX}deg`);
card.style.setProperty("--rotate-y", `${rotateY}deg`);
  const pushBack = 40;

card.style.setProperty("--translate-z", `${-pushBack}px`);
};

const handleMouseLeave = () => {
  const card = cardRef.current;
  if (!card) return;
  card.style.setProperty("--rotate-x", "0deg");
  card.style.setProperty("--rotate-y", "0deg");
  card.style.setProperty("--scale", "1");
};







    const handleAddToCart = () => {
        if(!user){
            toast.error("You need to login first!", {
  style: {
    border: "1px solid #9b0404",
    borderLeft: "4px solid #9b0404",
    padding: "16px",
    color: "#7A1C1C",
    background: "#FFF5F5",
    
  },
  iconTheme: {
    primary: "#9b0404",
    secondary: "#FFF5F5",
  },
  position: "bottom-right",
});
            navigate("/login");
            return;
        }
        dispatch(addTocart(product));
        toast.success("Product added to cart!" ,{
  style: {
    border: "1px solid #4CAF50",
    borderLeft: "4px solid #4CAF50",
    padding: "16px",
    color: "#155724",
    background: "#D4EDDA",
  },
  iconTheme: {
    primary: "#4CAF50",
    secondary: "#D4EDDA",
  },position: "bottom-right",
        });
    }
    return (
  <>
    <div 
      ref={cardRef}
      className="product-card group overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >

      {/* Image */}
      <div className="relative h-64 overflow-hidden bg-slate-100">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <span className="absolute left-4 top-4 rounded-full bg-[#72470a] px-3 py-1 text-xs font-semibold text-white shadow">
          {product.category}
        </span>
      </div>

      {/* Body */}
      <div className="bg-white space-y-5 p-6">

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

            <h3 className="text-3xl font-extrabold text-[#8A735A]">
              ${product.price}
            </h3>
          </div>

        </div>

        {/* Buttons */}
        <div
  className={`grid gap-3 ${
    user?.role === "admin"
      ? "grid-cols-3"
      : "grid-cols-1"
  }`}
>

          <button
          aria-label="Add to cart"
            onClick={handleAddToCart}
            className="flex items-center justify-center rounded-xl bg-[#72470a] py-3 text-white transition hover:bg-[#BDA88B]"
          >
            <FaCartPlus size={18} />
          </button>

          {user?.role === "admin" && (
            <button
              aria-label="Edit"
              onClick={() => dispatch(openEditProduct(product))}
              className="flex items-center justify-center rounded-xl border border-emerald-600 text-emerald-600 transition hover:bg-emerald-600 hover:text-white"
            >
              <FaEdit size={18} />
          </button>
          )}
          {user?.role === "admin" && (
          <button
            type="button"
            aria-label="Delete"
            onClick={() => dispatch(deleteProduct(product.id))}
            className="flex items-center justify-center rounded-xl border border-red-500 text-red-500 transition hover:bg-red-500 hover:text-white"
          >
            <FaTrash size={18} />
          </button>
          )}

        </div>

      </div>
    </div>

    {isOpen && <EditModel />}
  </>
);
 
};

export default ProductCard;