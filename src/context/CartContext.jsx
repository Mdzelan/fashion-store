import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

export const CratContext = createContext(null)

export const CartProvider = ({ children }) =>{
    const [cartItem, setCartItem] = useState([])
    const [buyNowItem, setBuyNowItem] = useState(null);


    const addToCart = (products) => {
        // setCartItem([...cartItem, products])
        const itemInCart = cartItem.find((item) => item._id === products._id)
        if(itemInCart){
             const updatedCart = cartItem.map((item) =>
              item._id === products._id ? {...item, quantity: item.quantity + 1} : item
            ); 
            setCartItem(updatedCart)
            toast.success("product quantity increased")
        }
        else{
            setCartItem([...cartItem, {...products, quantity: 1}])
            toast.success('product is added to cart')
        }
      

    }

    const updateQuantity = (cartItem, products_id, action) => {
        
        setCartItem( cartItem.map(item => {
            if(item._id === products_id){
                let newUnit = item.quantity;
                if(action === "increase"){
                    newUnit = newUnit + 1
                    toast.success('Quantity is increased')
                }
                else if (action === "decrease"){
                    newUnit = newUnit - 1
                    toast.success('Quantity is decrease')

                }
                return newUnit > 0 ? {...item, quantity: newUnit} : null

            }
            return item;
        }).filter(item => item != null))
     }

     const deleteItem = (products_id) => {
        setCartItem(cartItem.filter(item => item._id !== products_id))
        toast.success('Product is deleted from cart')
     }
      const buyNow = (products) => {
        setBuyNowItem({ ...products, quantity: 1 });
    };

    return <CratContext.Provider value={{ cartItem, setCartItem, addToCart, updateQuantity,deleteItem, buyNowItem, buyNow }}>
        {children}
    </CratContext.Provider>
}

export const useCart = ()=> useContext(CratContext)