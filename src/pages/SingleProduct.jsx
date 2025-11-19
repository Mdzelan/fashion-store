import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Loading from "../assets/Loading4.webm";
import Breadcrums from "../components/Breadcrums";
import { IoCartOutline } from "react-icons/io5";
import { useCart } from "../context/CartContext";


const SingleProduct = () => {
  const { _id } = useParams();
  const [singleProduct, setSingleProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart()
  const { buyNow } = useCart();
  const navigate = useNavigate();

  const getSingleProduct = async () => {
    try {
      const res = await axios.get(
        `https://fakestoreapiserver.reactbd.org/api/products/${_id}`
      );
      setSingleProduct(res.data);
    } catch (error) {
      console.log("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (_id) getSingleProduct();
  }, [_id]);


  if (loading) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <video muted autoPlay loop>
          <source src={Loading} type="video/webm" />
        </video>
      </div>
    );
  }


  if (!singleProduct) {
    return (
      <div className="text-center py-10 text-red-600 font-semibold">
        Product not found!
      </div>
    );
  }

  const discountPercentage = Math.round(
    ((singleProduct.price - singleProduct.discountedPrice) / singleProduct.price) * 100
  )

  return (
    <div className="px-4 pb-4 lg:px-0 md:px-0">
      <Breadcrums title={singleProduct.title} />

      <div className="max-w-6xl mx-auto lg:p-6 md:p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
        {/* Product Image */}
        <div className="w-full">
          <img
            src={singleProduct.image}
            alt={singleProduct.title}
            className="rounded-2xl w-full object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col gap-6">
          <h1 className="lg:text-3xl md:text-3xl text-xl font-bold text-gray-800">
            {singleProduct.title}
          </h1>
          <div className="text-gray-700">
            {singleProduct.brand?.toUpperCase()} / {singleProduct.category?.toUpperCase()} /{" "}
            {singleProduct.type}
          </div>
          <p className='text-xl text-red-500 font-bold'>${singleProduct.discountedPrice} <span className='line-through text-gray-700'>${singleProduct.price}</span> <span className='bg-linear-to-r  from-[#949494] to-[#363636] hover:scale-105 font-bold text-white px-4 py-2 rounded-full'>{discountPercentage}% discount</span></p>
          <p className="font-semibold">{singleProduct.description}</p>

          <div>
            <h1 className="font-semibold">
              Size: {Array.isArray(singleProduct.size) ? singleProduct.size.join(', ') : singleProduct.size}
            </h1>
          </div>

          <div className='flex gap-4 mt-4'>
              <button
              onClick={() => {
                buyNow(singleProduct);
                navigate("/buynow");
              }}
              className="px-6 py-2 text-lg bg-yellow-600 text-white rounded-md flex items-center gap-2 hover:bg-yellow-700 hover:scale-105 font-semibold"
            >
              <IoCartOutline className="w-6 h-6 text-black font-bold" /> Buy Now
            </button>
            <button onClick={() => addToCart(SingleProduct)} className='px-6 flex gap-2 py-2 text-lg bg-linear-to-r  from-[#949494] to-[#363636] hover:scale-105 font-bold text-white rounded-md'><IoCartOutline className='w-6 h-6 ' /> Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
