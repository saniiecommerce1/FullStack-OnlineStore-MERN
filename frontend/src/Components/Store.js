import React from "react";
import { Link, Outlet } from 'react-router-dom'
import {useSelector, useDispatch} from "react-redux";
import { clearState } from '../reduxSliceThunk/reducers/sliceGetAction'

function Store(){

const dispatch = useDispatch()
const token = useSelector((state) => state.product.token);  


// let token = localStorage.getItem('token')  

const clearToken = ()=>{
  dispatch(clearState())
}

return(

<>

  <div className="w-full h-50">

    <header className="bg-emerald-300">
      <nav className="flex  justify-end w-full bg-emerald-300 text-white p-4 pr-9">
     
        <div className="md:items-center md:w-auto flex">
       
          <div className="flex text-[20px]" v-else="">

          {(token)?<Link
              className="p-2 ml-2 bg-white text-emerald-600 font-semibold leading-none border border-gray-100 rounded hover:border-transparent hover:bg-gray-100"
              to='/dashboard'
            >
              Dashboard
            </Link>: <Link
              className="p-2 ml-2 bg-white text-emerald-600 font-semibold leading-none border border-gray-100 rounded hover:border-transparent hover:bg-gray-100"
              to='/login'
            >
              Dashboard
            </Link> }

            <Link
              className="p-2 ml-2 bg-white text-emerald-600 font-semibold leading-none border border-gray-100 rounded hover:border-transparent hover:bg-gray-100"
              to='/Contact'
            >
              Contact
            </Link>

            <Link
              className="p-2 ml-2 bg-white text-emerald-600 font-semibold leading-none border border-gray-100 rounded hover:border-transparent hover:bg-gray-100"
              to='/Contact'
            >
              Account
            </Link>


            {(!token)?
            <Link
              className="p-2 ml-2 bg-white text-emerald-600 font-semibold leading-none border border-gray-100 rounded hover:border-transparent hover:bg-gray-100"

              to='/login'
             
            >
              Login
            </Link>: <Link   className="p-2 ml-2 bg-white text-emerald-600 font-semibold leading-none border border-gray-100 rounded hover:border-transparent hover:bg-gray-100" to='/login' onClick={clearToken}>Logout</Link>}


            {/* onClick={()=>{localStorage.removeItem('token'); localStorage.removeItem('isAdmin')} } */}

          </div>
        </div>
      </nav>
    </header>


  </div>

  <Outlet/>
</>


)




 

}
export default Store;