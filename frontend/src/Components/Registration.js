import react, { useState, useEffect } from 'react'
import { Link, useNavigate} from 'react-router-dom';
import apiService from '../utils/apiService';
// import axios from 'axios';   //browser and node.js to deal HTTP req/res and auto parse into json format.this isPromise

function Registration() {
  const [profile, setProfile] = useState({})
  const [response, setResponse] = useState('')

  const navigate = useNavigate()

  const handler = ({ target }) => {
    let name = target.name
    let value = target.value
   
    setProfile((prev)=>({...prev, [name]: value}))
  }



  const submitValidation = async (e) => {
    e.preventDefault()
 
    try {
      let res = await apiService.post('/user/registration', profile) //link where we POST detail
      if ((typeof res.data) === 'string'){   //json small string
    
        setResponse(res.data)
      
      }

      if((typeof res.data) === 'object'){
        setResponse(`${res.data.firstName} Successfully Registered`)    
     
    }
     
     
    
    } catch (error) {
      console.log(error)
    }
  }

useEffect(()=>{
  if((typeof response) === 'object'){
     
  navigate('/login')
}
}, [response, navigate])

  return (
    <> 
     

    <div className="main">

    <h2 className="heading">{ response? response : 'User Information'}</h2>

      <div className="w-full text-10lg sm:max-w-md p-3 mx-auto">
        <form>

        <div className="mb-4">
            <label  className="block mb-[0.5]" htmlFor="firstName">
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              name="firstName"             
              className="field"
              value={profile.name} onChange={handler}  
            />
          </div>



          <div className="mb-4">
            <label  className="block mb-[0.5]" htmlFor="lastName">
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              name="lastName"
              className="field"
              value={profile.name} onChange={handler} 
            />
          </div>


          <div className="mb-4">
            <label  className="block mb-[0.5]" htmlFor="userName">
              Username
            </label>
            <input
              id="userName"
              type="text"
              name="userName"
              className="field"
              value={profile.name} onChange={handler}
            />
          </div>






          <div className="mb-4">
            <label  className="block mb-[0.5]" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="text"
              name="email"
              className="field"
              value={profile.name} onChange={handler} 
            />
          </div>

          <div className="mb-4">
            <label  className="block mb-[0.5]" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              className="field"
              value={profile.name} onChange={handler} 
            />
          </div>

          <div className="mb-4">
            <label  className="block mb-[0.5]" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              className="field"
              value={profile.name} onChange={handler} 
            />
          </div>
     




          <div className="mb-4">
            <label  className="block mb-[0.5]" htmlFor="phone">
              Phone Number
            </label>
            <input
              id="phone"
              type="number"
              name="phone"
              className="field"
              value={profile.name} onChange={handler}
            />
          </div>



          <div className="mb-4">
            <label  className="block mb-[0.5]" htmlFor="address">
              Address
            </label>
            <input
              id="address"
              type="text"
              name="address"
              className="field"
              value={profile.name} onChange={handler}
            />
          </div>
       
          <div className="mt-6">
            <button type="submit" value="Submit" onClick={submitValidation} className="btn">
              Register
            </button>
          </div>


          <div className="mt-6 text-center text-emerald-900">
            <Link to="/login" className="underline text-lg">
             Login With Us
            </Link>
          </div>
        </form>
      </div>
    </div>
  </>

 
  )

}

export default Registration