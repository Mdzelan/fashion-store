import React from "react";
import { MapPin } from 'lucide-react'
import { Link } from "react-router-dom";
import { FaCaretDown } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
import { useState } from "react";
import { CgClose } from "react-icons/cg";
import { useCart } from "../context/CartContext";
import { HiMenuAlt1, HiMenuAlt3 } from "react-icons/hi";
import ResponsiveMenu from "./ResponsiveMenu";



const Navbar = ({ location, getLocation, openDropdown, setOpenDropdown }) => {

  const {cartItem} = useCart()
  const [openNav, setOpenNav] = useState(false)

  const toggleDropdown = () => {
    setOpenDropdown(!openDropdown);
  };
  return (
    <div className="bg-white py-3 shadow-2xl px-4 lg:px-0 md:px-0">
      <div className="max-w-[1440px] mx-auto flex justify-between items-center">
        {/* logo section */}
        <div className="flex gap-7 items-center">
          <Link to={'/'}><h1 className='font-bold text-3xl'><span className='text-red-500 font-serif'>Fashion </span>store</h1></Link>

          {/* ✅ Location Section */}
          <div
            onClick={toggleDropdown}
            className="lg:flex md:flex gap-1 cursor-pointer text-gray-700 items-center hidden"
          >
            <MapPin className="text-red-500" />
            <span className="font-semibold">
              {location ? (
                <div className="space-y-1 leading-tight">
                  <p>{location.city || location.town || location.village}</p>
                  <p className="text-sm text-gray-500">
                    {location.state}, {location.state_district}
                  </p>
                </div>
              ) : (
                "Add Address"
              )}
            </span>

          </div>
          {
            openDropdown ? <div className="w-[250px] h-max shadow-2xl z-50 bg-white fixed top-16 left-60 border-2 p-5 border-gray-100 rounded-md">
              <h1 className="font-semibold md-4 text-xl flex justify-between">Change location <span onClick={toggleDropdown}><CgClose /></span></h1>
              <button onClick={getLocation} className="bg-red-500 text-white px-3 rounded-md cursor-pointer hover:bg-red-400">Detect my location</button>

            </div> : null
          }



        </div>

        {/* menu section */}
        <nav className="flex gap-7 items-center ">
          <ul className="md:flex gap-7 items-center    text-xl font-semibold hidden">
            <NavLink to={'/'} className={({ isActive }) => `${isActive ? "border-b-3 transition-all border-black" : "text-black"}  cursor-pointer hover:scale-105`}><li>Home</li></NavLink>
            <NavLink to={'/Products'} className={({ isActive }) => `${isActive ? "border-b-3 transition-all border-black" : "text-black"} cursor-pointer hover:scale-105`}><li>Products</li></NavLink>
            <NavLink to={'/about'} className={({ isActive }) => `${isActive ? "border-b-3 transition-all border-black" : "text-black"} hover:scale-105 cursor-pointer`}><li>About</li></NavLink>
            <NavLink to={'/contact'} className={({ isActive }) => `${isActive ? "border-b-3 transition-all border-black" : "text-black"} hover:scale-105 cursor-pointer`}><li>Contact</li></NavLink>

          </ul>
          <Link to={'Cart'} className="relative">
            <IoCartOutline className="h-7 w-7 hover:scale-110" />
            <span className="bg-black px-2 rounded-full absolute -top-3 -right-3 text-white ">{cartItem.length}</span>
          </Link>
          <div className="hidden  md:block">
            <SignedOut>
              <SignInButton className="bg-red-500 px-3 py-1 rounded-md cursor-pointer" />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>

         

          {
            openNav ? <HiMenuAlt3 onClick={()=> setOpenNav(false)} className="h-7 w-7 lg:hidden md:hidden"/>:<HiMenuAlt1 onClick={()=> setOpenNav(true)} className="h-7 w-7 lg:hidden md:hidden"/>
          }
        </nav>



      </div>
      <ResponsiveMenu openNav ={openNav} setOpenNav={setOpenNav}/>



    </div>
  );
};

export default Navbar;
