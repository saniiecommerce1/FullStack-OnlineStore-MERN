import react, { useState, useEffect } from 'react'
import { Link, useNavigate} from 'react-router-dom';
import apiService from '../utils/apiService';

function OrderUpdate() {
  const [orderUpdate, setOrderUpdate] = useState({})
  const [id, setId] = useState('')
  const [response, setResponse] = useState('')

 

  const handler = ({ target }) => {
  
    let name = target.name
    let value = target.value
 
    setOrderUpdate((prev)=>({...prev, [name]: value}))
  }



  const submitValidation = async (e) => {
    e.preventDefault()

    try {
      let res = await apiService.put(`/order/${id}`, orderUpdate) //link where we 
     
     if(res.data){
      setResponse('Order is Updated')
          }
    
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <> 
     

    <div className="main">

    <h2 className="heading">{ response? response : 'Order Update'}</h2>

      <div className="w-full text-10lg sm:max-w-md p-3 mx-auto">
        <form>


        <div className="mb-4">
            <label  className="block mb-[0.5]" htmlFor="orderId">
             orderId
            </label>
            <input
              id="orderId"
              type="text"
              name="orderId"             
              className="field"
              value={id} onChange={({target})=>setId(target.value)}  
            />
          </div>

        <div className="mb-4">
            <label  className="block mb-[0.5]" htmlFor="orderStatus">
             Order Status
            </label>
          <input
              id="orderStatus"
              type="text"
              name="orderStatus"             
              className="field"
              value={orderUpdate.name} onChange={handler}  
            />
          </div>


          <div className="mb-4">
            <label  className="block mb-[0.5]" htmlFor="shippingAddress">
            Shipping Address
            </label>
          <input
              id="shippingAddress"
              type="text"
              name="shippingAddress"             
              className="field"
              value={orderUpdate.name} onChange={handler}  
            />
          </div>

          <div className="mb-4">
            <label  className="block mb-[0.5]" htmlFor="contact">
            Contact
            </label>
          <input
              id="contact"
              type="number"
              name="contact"             
              className="field"
              value={orderUpdate.name} onChange={handler}  
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
              value={orderUpdate.name} onChange={handler}  
            />
          </div>
      
   
          <div className="mt-6">
            <button type="submit" value="Submit" onClick={submitValidation} className="btn">
              Update Order
            </button>
          </div>


          <div className="mt-6 text-center text-emerald-900">
            <Link to="/admin" className="underline text-lg">
             Goto Admin
            </Link>
          </div>
        </form>
      </div>
    </div>
  </>

 
  )

}

export default OrderUpdate;