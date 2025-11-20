import React from 'react'
import {BrowserRouter, Routes, Route, HashRouter } from 'react-router-dom'
import Home from './pages/Home'
import Products from './pages/Products'
import About from './pages/About'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import Navbar from './components/Navbar'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import Footer from './components/Footer'
import SingleProduct from './pages/SingleProduct'
import CategoryProduct from './pages/CategoryProduct'
import { useCart } from './context/CartContext'
import ProtectedRoute from './components/ProtectedRoute'
import BuyNowPage from './pages/BuyNow'
const App = () => {
  const [location, setLocation] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(false);
  const {cartItem, setCartItem} = useCart()

  
  const getLocation = async () => {
    if (!navigator.geolocation) {
      alert("Your browser does not support location detection.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        console.log(latitude, longitude);

        const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

        try {
          const response = await axios.get(url);
          const exactLocation = response.data.address;
          setLocation(exactLocation);
          setOpenDropdown(false);
          console.log("Detected Location:", exactLocation);
          console.log(exactLocation);
        } catch (error) {
          console.error("Error fetching location:", error);
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        alert("Could not access your location.");
      }
    );
  };

  //load cart locat storage
  useEffect(()=>{
    const storedCard = localStorage.getItem('cartItem')
    if(storedCard){
      setCartItem(JSON.parse(storedCard))
    }
  },[])
  //save cart to local storage
  useEffect(()=>{
    localStorage.setItem('cartItem', JSON.stringify(cartItem))
  },[cartItem])

  return (
    // <BrowserRouter>
    <HashRouter>
      <Navbar
        location={location}
        getLocation={getLocation}
        openDropdown={openDropdown}
        setOpenDropdown={setOpenDropdown}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:_id" element={<SingleProduct />} />
        <Route path="/category/:category" element={<CategoryProduct/>}></Route>
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/buynow" element ={<ProtectedRoute><BuyNowPage location={location} getLocation={getLocation}/></ProtectedRoute> }/>
        <Route path="/cart" element={<ProtectedRoute><Cart location={location} getLocation={getLocation}/></ProtectedRoute> } />
      </Routes>
      <Footer/>
      </HashRouter>
    //</BrowserRouter> 
  );
};

export default App;