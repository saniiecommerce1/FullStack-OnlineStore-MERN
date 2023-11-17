import react, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link, useNavigate , useParams } from 'react-router-dom';
import apiService from '../utils/apiService';
import {useDispatch, useSelector} from "react-redux"
import {addCartItem} from '../reduxSliceThunk/reducers/sliceGetAction'

function ProductPage(){

const [quantity , setQuantity] = useState(0)
const [response , setResponse] = useState('')

const dispatch = useDispatch() 
 const { productId } = useParams(); 

const getAllProducts = useSelector(state => state.product.allProducts)
 
const productOne = getAllProducts.filter(product=>product._id == productId)

if (productOne.length > 0) {
 const { title } = productOne[0];

} else {
 
 console.error(`Product with ID ${productId} not found.`);
}

const {title, productPicture, price, description} = productOne[0]



const cartItems = useSelector(state => state.product.cartItems)

const id =  cartItems.length ? cartItems[cartItems.length -1].id + 1 : 1

// [...{snId, propictue, price*quantity}, cartItem: {product, quantity}]

//  dispatch(addUser({id: users[users.length - 1].id + 1 , name: name, email:email}))

const cartHandler = (e)=>{
  e.preventDefault()
  const payload = {id: id , title: title , productPicture: productPicture, price:price , priceWithQuantity: price * quantity , cartItem:{product: productId, quantity: quantity } }

  

dispatch(addCartItem(payload))

setResponse("Item Added In Cart")



}

return(


<>

  <div className="flex flex-col min-h-screen items-center justify-center bg-gray-100 gap-8">
    <h2 className="heading">{response? response : ''}</h2>

    <div className="flex font-sans">

      <div className="flex-none w-96 h-80 relative">
        <img
          src={process.env.REACT_APP_IMG_BE_GET_PATH + productPicture}
          alt="Product Images"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
      </div>


      <form className="flex-col p-4" onSubmit={cartHandler}>


      <div className="flex gap-8">
          <h2 className=" mb-0 heading">
            {title}
          </h2>
          <div className="mb-0 heading ">{`Rs. ${price}`}</div>
          
        </div>


        <div className="flex space-x-4 mb-6 text-1xl font-medium">
          <div className="flex-auto flex space-x-4">
           <div className="field">{description}</div>      
          </div>
          </div>

        
      <div className="flex space-x-4 mb-6 text-sm font-medium">
          <div className="flex-auto flex space-x-4">
            <label className="text-2xl text-emerald-600" htmlFor="quantity">
              Quantity:
            </label>
            <input 
              id="quantity"
              type="number"
              name="quantity"
              placeholder="0"
              className="field text-emerald-600 text-[1.5xl]"
              min="1"
              max="5"
              value={quantity} onChange={({target})=>setQuantity(target.value)} 
            /> 
          </div>
          </div>

        <div className="flex space-x-4 mb-6 text-sm font-medium">
          <div className="flex-auto flex space-x-4">
            <button 
              className="btn"
              type="submit"
            >
              Add to Cart
            </button>
          </div>
          
        </div>
        
      </form>      

   </div>



  <div className="flex gap-10">
  <div className="text-center text-emerald-900">
            <Link to="/dashboard" className="underline text-2xl">
             Goto Dashboard
            </Link>
          </div>

          <div className="text-center text-emerald-900">
            <Link to="/cart" className="underline text-2xl">
             Goto Cart
            </Link>
          </div> 
   
  </div>



  </div>


</>


 )
}

export default ProductPage;