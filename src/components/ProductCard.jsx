import React from "react";
import { IoCartOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductCard = ({ products }) => {
  const navigate = useNavigate();
  const { addToCart, cartItem } = useCart()
  console.log(cartItem)

  return (
    <div className="border relative border-gray-200 rounded-2xl cursor-pointer overflow-hidden lg:w-[300px] lg:h-[300px] md:w-[300px] md:h-[300px]  w-[200px] h-[200px] hover:scale-105 hover:shadow-2xl transition-transform duration-300 bg-white/60 backdrop-blur-sm ">
      {/* image section */}
      <div className="overflow-hidden "
        onClick={() => navigate(`/products/${products._id}`)} >

        <img src={products.image} alt={products.title} className="bg-gray-200 aspect-square w-full  object-cover transition-transform duration-500 hover:scale-110" />
      </div>
      {/* Glassmorphism Bottom Section */}
      <div className="hidden md:block absolute bottom-0 left-0 right-0 bg-white/20 backdrop-blur-lg border-t border-white/30 p-3"  >
      <div className="flex justify-around">
              <p className="text-lg text-black font-bold">${products.discountedPrice}</p>
          
          <h1 className="line-clamp-2 font-semibold text-gray-800">
          {products.title}
        </h1>
    
      </div>
        

        {/* Glass Effect Button */}
        <button onClick={() => addToCart(products)}
          className=" mt-3 w-full px-3 py-2 text-lg rounded-md font-semibold 
                     text-gray-900 flex gap-2 items-center justify-center 
                     bg-white/30 backdrop-blur-md border border-white/40 shadow-md 
                     transition-all duration-300 hover:bg-white/50 hover:shadow-lg hover:scale-[1.02]"
        >
          <IoCartOutline className="w-6 h-6" /> Add to Cart
        </button>
      </div>
      <div className=" block md:hidden absolute bottom-0 left-0 right-0    p-2">
        <p className="text-lg text-black font-bold">${products.title}</p>
        <div className="flex justify-around">
              <p className="text-lg text-black font-bold  bg-white/30 backdrop-blur-md border border-white/40 px-1 py-1 rounded-md">${products.discountedPrice}</p>
        <button
          onClick={() => addToCart(products)}
          className=" px-3 py-2 text-base rounded-md font-semibold 
          text-gray-900 flex gap-2 items-center justify-center bg-white/30 backdrop-blur-md border border-white/40 
            shadow-sm"
        >
          <IoCartOutline className="w-5 h-5" /> Add 
        </button>
        </div>
     
      </div>


    </div>

  );
};

export default ProductCard;
