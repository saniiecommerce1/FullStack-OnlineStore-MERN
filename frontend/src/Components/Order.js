import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import apiService from "../utils/apiService";



function Order() {

 const [order, setOrder] = useState({})
 const [response, setResponse] = useState('')

 const navigate = useNavigate()

const cartItems = useSelector(state=>state.product.cartItemsRes)



const handler = ({ target }) => {
 let name = target.name
 let value = target.value
 setOrder((prev)=>({...prev, [name]: value}))
}


const orderHandler = async (e) => {
 e.preventDefault()
 
 try {
  const data = {cart:cartItems._id ,user:cartItems.user, ...order} 

   let res = await apiService.post('/order/', data)

  setResponse(res.data._id)
 }catch(error){
  console.log(error.message)
 }
}

return (
 <> 
  


  { response? <div className="main">
   <h2 className="heading">Thanks for Shopping with Us.</h2>
   <h2 className="heading">{`Your Order ID: ${response} with Total Amount ${cartItems.totalPrice}`}</h2>

   <div className="mt-6 text-center text-emerald-900">
         <Link to="/dashboard" className="underline text-lg">
          Back to Dashboard
         </Link>
       </div>
   
   </div> : 

 <div className="main">
   <h2 className="heading">Order Detail</h2>

   <div className="w-full text-10lg sm:max-w-md p-3 mx-auto">


     <div className="mb-4">{`Total Amount Rs.${cartItems.totalPrice}`}</div>

     <form>

     <div className="mb-4">
         <label  className="block mb-[0.5]" htmlFor="shippingAddress">
         Shipping Address:
         </label>
         <input
           id="shippingAddress"
           type="text"
           name="shippingAddress"             
           className="field"
           value={order.name} onChange={handler}  
         />
       </div>

       <div className="mb-4">
            <label  className="block mb-[0.5]" htmlFor="contact">
              Phone Number
            </label>
            <input
              id="contact"
              type="number"
              name="contact"
              className="field"
              value={order.name} onChange={handler}
            />
          </div>



       <div className="mb-4">
         <label  className="block mb-[0.5]" htmlFor="country">
           Country
         </label>
         <input
           id="country"
           type="text"
           name="country"
           className="field"
           value={order.name} onChange={handler}
         />
       </div>

     
    
       <div className="mt-6">
         <button type="submit" value="Submit" onClick={orderHandler} className="btn">
           Place Order
         </button>
       </div>


       <div className="mt-6 text-center text-emerald-900">
         <Link to="/dashboard" className="underline text-lg">
          Back to Dashboard
         </Link>
       </div>
     </form>
   </div>
 </div>
}
</>


)

}

export default Order;
