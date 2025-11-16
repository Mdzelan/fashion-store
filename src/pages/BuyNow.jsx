import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useUser } from "@clerk/clerk-react";
import { LuNotebookText } from "react-icons/lu";
import { MdDeliveryDining } from "react-icons/md";
import { GiShoppingBag } from "react-icons/gi";

const BuyNow = ({ location, getLocation }) => {
  const { buyNowItem } = useCart();
  const { user } = useUser();

  // Local state for selected size & quantity
  const [selectedSize, setSelectedSize] = useState(
    Array.isArray(buyNowItem?.size) ? buyNowItem.size[0] : buyNowItem?.size
  );
  const [quantity, setQuantity] = useState(buyNowItem?.quantity || 1);

  if (!buyNowItem) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold text-red-600">
        No product selected!
      </div>
    );
  }

  // Handlers
  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  const totalPrice = (buyNowItem.discountedPrice || buyNowItem.price) * quantity;

  return (
    <div className="max-w-[1440px] mx-auto px-2 mb-10 mt-10">
     

      <div className="flex lg:flex-row md:flex-row flex-col gap-5 items-center ">
        <div className="w-80 h-70  ">
          <img
          src={buyNowItem.image}
          alt={buyNowItem.title}
          class="w-full h-full object-contain rounded-md"
        />
        </div>
      

        <div className="flex flex-col gap-3">
          <h2 className="text-xl font-bold">{buyNowItem.title}</h2>

          <p className="text-lg font-semibold text-red-500 mt-2">
            Price: ${buyNowItem.discountedPrice || buyNowItem.price}
          </p>

          {/* Quantity selector */}
          <div className="flex items-center gap-3 mt-2 ">
            <label className="font-semibold">Quantity:</label>
            <div className="flex items-center  rounded-md overflow-hidden  bg-gray-300 ">
              <button
                onClick={handleDecrease}
                className="px-3 py-1 bg-gray-300 hover:bg-gray-400"
              >
                -
              </button>
              <span className="px-4">{quantity}</span>
              <button
                onClick={handleIncrease}
                className="px-3 py-1 bg-gray-300 hover:bg-gray-400"
              >
                +
              </button>
            </div>
          </div>

          {/* Size Selection */}
          {Array.isArray(buyNowItem.size) && buyNowItem.size.length > 0 && (
            <div className="mt-2">
              <label className="font-semibold mr-2">Select Size:</label>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="p-2 bg-gray-300 rounded-md"
              >
                {buyNowItem.size.map((size, idx) => (
                  <option key={idx} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
          )}

          {!Array.isArray(buyNowItem.size) && (
            <p className="font-semibold mt-2">Size: {buyNowItem.size}</p>
          )}
        </div>
      </div>


      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 lg:gap-20 md:gap:20'>
        <div className='bg-gray-200 rounded-md p-7 mt-4 space-y-2'>
          <h1 className='text-gray-800 font-bold text-xl'>Delivery info</h1>
          <div className='flex flex-col space-y-1'>
            <label htmlFor="">Full Name</label>
            <input type="text" placeholder='Enter your Name' className='p-2 rounded-md' value={user?.fullName} />

          </div>
          <div className='flex flex-col space-y-1'>
            <label htmlFor="">Address</label>
            <input type="text" placeholder='Enter your Address' className='p-2 rounded-md' value={location?.county || ""}
              onChange={(e) => getLocation?.({ ...location, county: e.target.value })} />
          </div>
          <div className='flex w-full gap-5'>
            <div className='flex flex-col space-y-1 w-full'>
              <label htmlFor="">State</label>
              <input type="text" placeholder='Enter your State' className='p-2 rounded-md w-full' value={location?.state || ""}
                onChange={(e) => getLocation?.({ ...location, state: e.target.value })} />
            </div>
            <div className='flex flex-col space-y-1 w-full'>
              <label htmlFor="">PostCode</label>
              <input type="text" placeholder='Enter your PostCode' className='p-2 rounded-md w-full' value={location?.postcode
                || ""}
                onChange={(e) => getLocation?.({
                  ...location, postcode
                    : e.target.value
                })} />
            </div>

          </div>

          <div className='flex w-full gap-5'>
            <div className='flex flex-col space-y-1 w-full'>
              <label htmlFor="">Country</label>
              <input type="text" placeholder='Enter your Country' className='p-2 rounded-md w-full' value={location?.country || ""}
                onChange={(e) => getLocation?.({ ...location, country: e.target.value })} />
            </div>
            <div className='flex flex-col space-y-1 w-full'>
              <label htmlFor="">Phone number</label>
              <input type="text" placeholder='Enter your Phone Number' className='p-2 rounded-md w-full' />
            </div>

          </div>
          <button className='bg-linear-to-r  from-[#949494] to-[#363636] text-white px-3 py-1 rounded-md mt-3 cursor-pointer'>Submit</button>
          <div className='flex justify-center items-center w-full text-gray-800'>
            --------OR--------
          </div>
          <div className='flex justify-center'>
            <button className='bg-linear-to-r  from-[#949494] to-[#363636] text-white px-3 py-2 rounded-md cursor-pointer' onClick={getLocation}>Detect Location</button>

          </div>

        </div>
        <div className='bg-white border-gray-200 shadow-xl rounded-md p-7 mt-4 space-y-7 h-max'>
          <h1 className='text-gray-800 font-bold text-xl'>Bill details</h1>
          <div className='flex justify-between items-center'>
            <h1 className='flex gap-1 items-center text-gray-700'><span><LuNotebookText /></span>Item total</h1>
            <p>${totalPrice}</p>
          </div>
          <div className='flex justify-between items-center'>
            <h1 className='flex gap-1 items-center text-gray-700'><span><MdDeliveryDining /></span>Delivery Charge</h1>
            <p className='text-red-500 font-semibold'><span className='text-gray-600 line-through'>$120</span> FREE</p>
          </div>
          <div className='flex justify-between items-center'>
            <h1 className='flex gap-1 items-center text-gray-700'><span><GiShoppingBag /></span>Handling Charge</h1>
            <p className='text-red-500 font-semibold'>$5</p>
          </div>
          <hr className='text-gray-200 mt-2' />
          <div className='flex justify-between item-center'>
            <h1 className='font-semibold text-lg'>Total price</h1>
            <p className='font-semibold text-lg'>${totalPrice + 5} </p>
          </div>
          <div>
            <h1 className='font-semibold text-gray-700 mb-3 mt-7'>Apply Promo Code</h1>
            <div className='flex gap-3'>
              <input type="text" placeholder='Enter Code' className='p-2 rounded-md w-full' />
              <button className='bg-white text-black border-gray-200 px-4 cursor-pointer py-1 rounded-md'>Apply</button>
            </div>
          </div>
          <button className='bg-red-500 text-white px-3 py-2 rounded-md w-full cursor-pointer mt-3'>Proceed to Checkout</button>

        </div>
      </div>
    </div>
  );
};

export default BuyNow;
