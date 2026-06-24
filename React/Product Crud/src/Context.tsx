import { createContext, useEffect, useState ,useContext } from "react";
import {useNavigate} from 'react-router-dom'
import type { Product } from "./Types";
import AuthContext from "./AuthContext";
import {toast} from 'react-toastify'
type ContextType = {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  cart: { product: Product; quantity: number ; selected : boolean}[];
  addQuantity : ( id : number) => void;
  decreaseQuantity : ( id : number) => void;
  toggleSelected : ( id : number) => void;
  api : string;
  
};

const ProductContext = createContext<ContextType | null>(null);

export const ProductProvider = ({children} : {children: React.ReactNode}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<{ product: Product; quantity: number , selected : boolean }[]>([]);
  const api = "https://dummyjson.com";
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  
  useEffect(() => {
    fetch(`${api}/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
      });
  }, []);

 const addToCart = (product: Product) => {
  
  if (!auth?.token) {
    toast.error("You must be logged in to add products to the cart", {
      position: "top-center",
    });
    navigate("/login");
    return;
  }
  
  setCart((prev) => {
    const existing = prev.find((item) => item.product.id === product.id);

    if (existing) {
      return prev.map((item) =>
        item.product.id === product.id 

          ? { ...item, quantity: item.quantity + 1 }
          : item

        );
        
      }

    return [...prev, { product, quantity: 1 , selected : false}];
  });
toast.success('Product added to cart'
  ,{position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",}) };
;

const removeFromCart = (id: number) => {
  setCart((prev) =>
    prev.filter((item) => item.product.id !== id)
  );

  toast.success("Product removed from cart 🗑️", {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};



const addQuantity = (id: number) => {
  setCart((prev) =>
    prev.map((item) =>
      item.product.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    )
  );
};
const decreaseQuantity = (id: number) => {
  setCart((prev) =>
    prev
      .map((item) =>
        item.product.id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0)
  );
};
  const toggleSelected = (id : number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === id
          ? { ...item, selected: !item.selected }
          : item
      )
    );
  }
  return (
    <ProductContext.Provider value={{ api,products, setProducts , addToCart, removeFromCart , cart , addQuantity , decreaseQuantity , toggleSelected}}>
      {children}
    </ProductContext.Provider>
  );

};

export default ProductContext;