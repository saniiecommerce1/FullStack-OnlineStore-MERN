import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {useSelector} from "react-redux";



//For thunk general API calling and store their 
import { useDispatch } from "react-redux";
import getProducts from "../reduxSliceThunk/reducers/defineAsyncAction";


function Dashboard(){   //

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const getAllProducts = useSelector(state => state.product.allProducts)
  

useEffect(()=>{
  
  dispatch(getProducts())

}, [])

  return(
    
    <>
   <div className="bg-gray-50 max-h-screen text-end p-10" ><i className="fa-solid fa-cart-shopping text-6xl  text-emerald-600 cursor-pointer" onClick={()=>navigate('/cart')}></i></div>
    <div className=" bg-gray-50 flex flex-col justify-center pb-[22rem]">

    <h2 className="heading">Welcome To The User</h2>
   
    <div className="relative m-3 flex flex-wrap mx-auto justify-center">
  {getAllProducts.map((product, index)=>(
     <div key={index} onClick={()=>navigate(`/dashboard/${product._id}`)} className="relative max-w-sm min-w-[340px] bg-white shadow-md rounded-3xl p-2 mx-1 my-3 cursor-pointer">
     <div key={product._id} className="overflow-x-hidden rounded-2xl relative">
       <img
         className="h-40 rounded-2xl w-full object-cover"
         src={process.env.REACT_APP_IMG_BE_GET_PATH + product.productPicture}
       />
      
     </div>
     <div className="mt-4 pl-2 mb-2 flex justify-between ">
       <div>
         <p className="text-lg font-semibold text-gray-900 mb-0">
           {product.title}
         </p>
         <p className="text-md text-gray-800 mt-0">{`Rs. ${product.price}`}</p>
       </div>
    
     </div>
   </div>
  ))}       
   </div> 
 

    </div>
  </>
  
   
  )  
  
  }


  

 export default Dashboard;