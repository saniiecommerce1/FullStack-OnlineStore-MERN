import react, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux"
import {updateCartItem} from '../reduxSliceThunk/reducers/sliceGetAction'

function CartUpdate(){

const {cartId} = useParams() 
const dispatch = useDispatch()
const navigate = useNavigate()

const cartItems = useSelector(state=> state.product.cartItems)

const updateCart = cartItems.find(cartItem=>cartItem.id == cartId)



const [uQuantity , setUQuantity] = useState(updateCart.cartItem.quantity)
const [response , setResponse] = useState('')

const updateCartHandler = (e)=>{
e.preventDefault()

const payload = {...updateCart, quantity:uQuantity,  priceWithQuantity: updateCart.price * uQuantity , cartItem:{product: updateCart.cartItem.product, quantity: uQuantity } }


dispatch(updateCartItem(payload))
setResponse("Cart is Updated")
navigate('/cart')
}


return(
 <>
 <div className="flex flex-col min-h-screen items-center justify-center bg-gray-100 gap-8">
    <h2 className="heading">{response? response : ''}</h2>

    <div className="flex font-sans">

      <div className="flex-none w-96 h-80 relative">
        <img
          src={process.env.REACT_APP_IMG_BE_GET_PATH + updateCart.productPicture}
          alt="Product Images"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
      </div>


      <form className="flex-col p-6" onSubmit={updateCartHandler}>


      <div className="flex gap-8">
          <h2 className="heading">
            {updateCart.title}
          </h2>
          <div className="heading ">{`Rs. ${updateCart.price}`}</div>
          
        </div>


            
      <div className="flex space-x-4 mb-6 text-sm font-medium">

      
          <div className="flex-auto flex space-x-4">
            <label className="text-2xl text-emerald-600" htmlFor="uquantity">
              Quantity:
            </label>
            <input 
              id="uquantity"
              type="number"
              name="uquantity"
              className="field text-emerald-600 text-[1.5xl]"
              min="1"
              max="5"
              value={uQuantity} onChange={({target})=>setUQuantity(target.value)}
            /> 
          </div>
          </div>

        <div className="flex space-x-4 mb-6 text-sm font-medium">
          <div className="flex-auto flex space-x-4">
            <button 
              className="btn"
              type="submit"
            >
              Update Cart
            </button>
          </div>
          
        </div>
        
      </form>      

   </div>



                   
   
  </div>
 
 
 
 </>
)

}

export default CartUpdate;