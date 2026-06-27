import Home from '../src/pages/home.tsx'
import Navbar from '../src/components/Navbar.tsx'
import EditProduct from '../src/components/EditModel.tsx'
import {Route, Routes} from "react-router-dom";
import Cart from "./pages/cart.tsx";
import './App.css'

function App() {


  return (
    <>
    <Navbar />
   
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/edit/:id" element={<EditProduct />} />
    </Routes>
    
    </>
  )
}

export default App
