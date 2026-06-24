import { useParams } from "react-router-dom";
import { useContext } from "react";
import ProductContext from "../Context";
import {Link} from 'react-router-dom'
import '../App.css';

export default function ProductDetail() {
  const { id } = useParams();

  const context = useContext(ProductContext);
  if (!context) return null;

  const { products } = context;
  const {addToCart} = context;
  
  const productId = Number(id);
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return <p className="p-10">Loading product...</p>;
  }

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-6xl mx-auto bg-black rounded-3xl shadow-lg overflow-hidden">
        <div className="grid md:grid-cols-2 gap-10 p-8">

          {/* Image */}
          <div className="bg-white rounded-2xl flex items-center justify-center p-8">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="h-96 object-contain"
            />
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center">
            <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full w-fit text-sm font-medium">
              Product #{product.id}
            </span>

            <h1 className="text-4xl font-bold mt-4 text-white">
              {product.title}
            </h1>

            <p className="text-white mt-5 leading-relaxed">
              {product.description}
            </p>

            <div className="flex items-center gap-4 mt-6">
              <span className="text-yellow-500 text-xl">
                ⭐ {product.rating?.rate}
              </span>

              <span className="text-gray-500">
                ({product.rating?.count} Reviews)
              </span>
            </div>

            <div className="mt-8">
              <span className="text-4xl font-bold text-green-600">
                ${product.price}
              </span>
            </div>

            <div className="flex gap-4 mt-8">
              <button onClick={() => addToCart(product) }   className="btn1 text-white px-8 py-3 rounded-xl hover:bg-gray-800 transition">
                Add To Cart
              </button>

              <button className="btn2 border-black px-8 py-3 rounded-xl hover:bg-black hover:text-white transition">
                Buy Now
              </button>   
              <Link to="/store" className="btn2 border-black px-8 py-3 rounded-xl hover:bg-black hover:text-white transition">Back to Store</Link>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}