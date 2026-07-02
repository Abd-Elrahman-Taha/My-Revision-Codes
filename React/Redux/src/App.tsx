import Shop from './pages/shop.tsx'
import Navbar from '../src/components/Navbar.tsx'
import EditProduct from '../src/components/EditModel.tsx'
import Login from '../src/pages/login.tsx'
import {Route, Routes} from "react-router-dom";
import Cart from "./pages/cart.tsx";
import Signup from "./pages/signup.tsx";
import Dashboard from "./pages/dashboard.tsx";
import Home from "./pages/home.tsx";
import Checkout from "./pages/checkout.tsx";
import Orders from "./pages/orders.tsx";
import Tracking from "./pages/tracking.tsx";
import { useAppDispatch, useAppSelector } from './hooks/hooks.ts';
import { useEffect } from 'react';
import { loadCart } from './features/products/cartSlice.ts';
import { Toaster } from "react-hot-toast";
import './App.css'

function App() {
 const dispatch = useAppDispatch();
  const user = useAppSelector((state ) => state.auth.user);

  useEffect(() => {
    if (!user) return;

    const savedCart = localStorage.getItem(`cart-${user.id}`);

    if (savedCart) {
      dispatch(loadCart(JSON.parse(savedCart)));
    }
  }, [dispatch, user]);


  return (
    <>
     <Toaster
        position="top-right"
        reverseOrder={false}
      />
    <Navbar />
   
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/edit/:id" element={<EditProduct />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/tracking" element={<Tracking />} />
    </Routes>
    
    </>
  )
}

export default App
