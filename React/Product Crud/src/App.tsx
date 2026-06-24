import Store from './pages/Store';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import ProductDetail from './components/ProductDetail';
import Cart from './pages/Cart';
import Login from './components/Login';
import {ToastContainer} from 'react-toastify'
import './App.css'
import {Routes , Route} from 'react-router-dom'


function App() {

   
  return (
    <>
    <ToastContainer/>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/store" element={<Store />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={< Login />} />
    </Routes>
    </>
  )
}

export default App
