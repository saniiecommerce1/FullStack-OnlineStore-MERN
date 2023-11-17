import react, { useState } from 'react'
import { Link, useNavigate} from 'react-router-dom';
import apiService from '../utils/apiService';
import {useSelector} from "react-redux";



function Admin(){

return(

<div className="min-h-screen bg-gray-50 px-4 text-emerald-600 antialiased">
 
 <h2 className="heading pt-6">Admin Pannel</h2>

  <div className="flex h-full flex-col justify-center">
      

      <div className="text-2xl font-bold mt-6">
            <Link to= "/add-product" >
             Add Product
            </Link>
          </div>  



     <div className="text-2xl font-bold mt-6">
            <Link to= "/user-update" >
             User Update/isAdmin Change
            </Link>
          </div>  
      

          <div className="text-2xl font-bold mt-6">
            <Link to= "/order-update" >
             Order Update/Order Status Change
            </Link>
          </div> 

          
      <div className="text-2xl font-bold mt-6">
            <Link to= "/dashboard" >
            Shopping
            </Link>
          </div>   

</div>

</div>


 )
}

export default Admin;

