import React from 'react'
import { useCart } from '../context/CartContext'
import { FaRegTrashAlt } from 'react-icons/fa'
import { LuNotebookText } from 'react-icons/lu'
import { MdDeliveryDining } from 'react-icons/md'
import { GiShoppingBag } from 'react-icons/gi'
import { useUser } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'
import emptyCart from '../assets/empty-cart.png'
const Cart = ({ location, getLocation }) => {
  const { cartItem, updateQuantity, deleteItem } = useCart()
  const { user } = useUser()
  // console.log(user);
  const navigate = useNavigate()

  const totalPrice = cartItem.reduce(
  (total, item) => total + item.price * item.quantity,
  0
  )

  return (
    <div className='max-w-[1440px] mx-auto px-2 mb-10'>
      {
        cartItem.length > 0 ? <div className=''>
          <h1 className='font-bold text-2xl'>My Cart({cartItem.length})</h1>
          <div>
            <div className='mt-10 '>
              {cartItem.map((item, index) => {
                return <div key={index} className='bg-gray-100 p-5 rounded-md flex items-center justify-between mt-3 w-full'>
                  <div className='flex items-center gap-2 lg:gap-4 md:gap:4'>
                    <img src={item.image} alt={item.title} className='w-20 h-20 rounded-md' />
                    <div>
                      <h1 className='w-[300px] line-clamp-2'>{item.title}</h1>
                      <p className='text-red-500 font-semibold text-lg'>${item.price}</p>
                    </div>
                  </div>
                  <div className='bg-gray-700 text-white flex gap-4 p-2 rounded-md font-bold text-xl -mr-1'>
                    <button onClick={()=>updateQuantity(cartItem, item._id ,"decrease")} className='cursor-pointer' >-</button>
                    <span>{item.quantity}</span>
                    <button onClick={()=>updateQuantity(cartItem, item._id ,"increase")} className='cursor-pointer'>+</button>
                  </div>
                  <span onClick={() => deleteItem(item._id)} className='hover:bg-gray-300 transition-all rounded-full p-3 hover:2xl'>
                    <FaRegTrashAlt className='text-black text-2xl cursor-pointer ' />
                  </span>

                </div>
              })}
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
        </div> : <div className='flex flex-col gap-3 justify-center items-center h-[600px]'>
          <h1 className='text-red-500 font-bold text-5xl text-muted'>Oh! Your Cart Is Empty</h1>
          <img src={emptyCart} alt="" className='w-[400px]' />
          <button onClick={()=>navigate('/products')} className='bg-red-500 text-white px-2 py-2 rounded-md cursor-pointer'>Countinue Shopping</button>

        </div>
      }
    </div>
  )
}

export default Cart