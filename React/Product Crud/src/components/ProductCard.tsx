import type { Product } from '../Types';
import { useState, useContext ,useRef} from 'react';
import EditModel from './EditModel';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ProductContext from '../Context';
import {motion} from 'framer-motion'
import '../App.css';
type Props = {
  product: Product;
  onEdit: (
    id: number,
    updatedProduct: Omit<Product, 'id' | 'thumbnail'>
  ) => void;
  onDelte: (id: number) => void;
};

const ProductCard = ({ product, onEdit , onDelte}: Props) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const context = useContext(ProductContext);
  if (!context) return null;
  const { addToCart} = context;
  
  const DeleteProduct = (id:number) =>{
    onDelte(id);
    toast.success("Product deleted successfully", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    })
  }
const cardRef = useRef<HTMLDivElement>(null);

const handleMouseMove = (e: React.MouseEvent) => {
  const card = cardRef.current;
  if (!card) return;

  const rect = card.getBoundingClientRect();

  const intensity = 2.5; // قوة الانحناء

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

  return (
    

   <motion.div
  initial={{ opacity: 0, y: 30, scale: 0.9 }}
  animate={{ opacity: 1, y: 0, scale: 1 }}
  transition={{
    duration: 0.5,
    ease: "easeOut"
  }}
>
  <div
    ref={cardRef}
    onMouseMove={handleMouseMove}
    onMouseLeave={handleMouseLeave}
    className="product-card bg-black rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col h-full"
  >
    
      <div onClick={() => navigate(`/product/${product.id}`)}>
      <div  className="img h-64 p-6 bg-gray-100 flex items-center justify-center m-2 p-1">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-full object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-3">
          <span className="bg-blue-100 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full">
            Latest
          </span>

          <span className="text-yellow-500 font-medium ">
            ⭐ {product.rating.rate}
          </span>
        </div>

        <h2 className="text-white font-bold text-lg line-clamp-2 min-h-[56px]">
          {product.title}
        </h2>

        <p className="text-white text-sm mt-3 line-clamp-3">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-auto pt-5">
          <span className="text-2xl font-bold text-green-600">
            ${product.price}
          </span>

          <span className="text-sm text-gray-400">
            {product.rating.count} reviews
          </span>
        </div>
        </div>
        </div>
        <button
          className="btn1 w-[90%] mx-auto text-white py-3 rounded-xl transition"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>

        <button
          onClick={() => setOpen(true)}
          className="btn2 w-[90%] mx-auto  text-white py-3 rounded-xl  transition"
        >
          Edit Product
        </button>
        <button
          onClick={() => DeleteProduct(product.id)}
          className=" btn3 w-[90%] mx-auto  text-white py-3 rounded-xl  transition"
        >
          Delete Product
        </button>
      
         {open && <EditModel  product={product} onClose={() => setOpen(false)} onSave={onEdit}  />}
      </div>
    </motion.div>
    
  );
};
export default ProductCard;