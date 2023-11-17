import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {removeCartItem } from '../reduxSliceThunk/reducers/sliceGetAction'
import apiService from "../utils/apiService";
import { getCartItemsByResponse } from "../reduxSliceThunk/reducers/sliceGetAction";

function Cart(){

 const [response , setResponse] = useState('')
const dispatch = useDispatch()
const navigate = useNavigate()
const cartItems = useSelector(state => state.product.cartItems)


let total = 0
let cartItem = []

cartItems.forEach(cartitem=>{
total += cartitem.priceWithQuantity
cartItem.push(cartitem.cartItem)} )


const removeCartHandler= (id)=>{
dispatch(removeCartItem(id))
setResponse("Item Removed From Cart")
}


const userId = useSelector(state => state.product.userId)


const placeOrderHandler= async(e)=>{
 e.preventDefault()
 const data = {orderItems: cartItem, user: userId}


 try{
 if(data.orderItems.length) {
 const res = await apiService.post('/cart/', data)

dispatch(getCartItemsByResponse(res.data))
navigate('/order')

}}catch(error){
 console.log("Error in CART POST" , error)
}

}

return(
<>

<div className="min-h-screen bg-gray-50 px-4 text-emerald-600 antialiased">
 
 <h2 className="heading pt-6">{response? response : ''}</h2>

  <div className="flex h-full flex-col justify-center">
    {/* Table */}
    
   
    <div className="mx-auto w-full max-w-2xl rounded-sm border border-emerald-200 bg-white shadow-lg">
    <header className="border-b border-emerald-100 px-5 py-4">
      <div className="text-1xl md:text-3xl font-semibold text-emerald-600">Cart Items</div>
    </header>
    <div className="overflow-x-auto p-3">
      <table className="w-full table-auto">
        <thead className="bg-emerald-50 text-lg font-bold uppercase text-emerald-900">
          <tr>
          <th className="p-3">
              <div className="text-center font-semibold">S.No</div>
            </th>
           
            <th className="p-3">
              <div className="text-center font-semibold">Product</div>
            </th>
            <th className="p-3">
              <div className="text-center font-semibold">Price</div>
            </th>
            <th className="p-3">
              <div className="text-center font-semibold">Quantity</div>
            </th>
            <th className="p-3">
              <div className="text-center font-semibold">Total</div>
            </th>
            <th className="p-3">
              <div className="text-center font-semibold">Update</div>
            </th>
            <th className="p-3">
              <div className="text-center font-semibold">Remove</div>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-emerald-100 text-lg">
          {/* record 1 */}
          {cartItems.map((cartItem, index)=>(
          <tr key={index}>
          <td className="p-3">
              <div className="font-medium text-emerald-500 text-center ">
               {cartItem.id}
              </div>
            </td>
            <td className="p-3">
              <div className="font-medium text-emerald-500 text-center ">
                {cartItem.title}
              </div>
            </td>
            <td className="p-3">
              <div className="font-medium text-emerald-500 text-center ">
                {cartItem.price}
              </div>
            </td>
            <td className="p-3">
              <div className="font-medium text-emerald-500 text-center">{cartItem.cartItem.quantity}</div>
            </td>
            <td className="p-3">
              <div className="text-center font-medium text-emerald-500">
              {`Rs.${cartItem.priceWithQuantity}`}
              </div>
            </td>
            <td className="p-3">
              <div className="flex justify-center">
                <Link to={`/cart/${cartItem.id}`} className= "text-[1.5xl]">
                <i className="fa-solid fa-pen-to-square hover:bg-emerald-100 hover:text-emerald-400"></i>
                
                </Link>
              </div>
            </td>
            <td className="p-3">
              <div className="flex justify-center">
                <button onClick={()=>{removeCartHandler(cartItem.id)}}>
                  <svg
                    className="h-8 w-8 rounded-full p-1 hover:bg-emerald-100 hover:text-emerald-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </td>
          </tr>))       
          }
        
        </tbody>
      </table>
    </div>





    {/* total amount */}
    <div className="flex justify-end space-x-4 border-t border-emerald-100 px-5 py-4 text-2xl font-bold">
      <div>Total</div>
      <div className="text-emerald-900">
       {`Rs.${total}`}
      </div>
    </div>
  </div>
   

  </div>

  <div className="w-fit mt-6 text-center m-auto">
              <button type="submit" value="Submit" onClick={placeOrderHandler} 
              className=" btn ">
                Checkout
              </button>
            </div>

  <div className="pt-5 text-center text-emerald-900">
            <Link to="/dashboard" className="underline text-2xl">
             Goto Dashboard
            </Link>
   </div>

</div>


 
</>) 

}

export default Cart;