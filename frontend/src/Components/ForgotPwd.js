import react, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import apiService from '../utils/apiService';

function ForgotPwd(){

 const [profile, setProfile] = useState({})

 const handler = ({ target }) => {
  let name = target.name
  let value = target.value

  setProfile((prev)=>({...prev, [name]: value}))
}

  const [resOtp , setResOtp] = useState(0)   //post forgot res otp

  const [response, setResponse] = useState('')   //post res 
  
  const [otpResponse, setOtpResponse] = useState('')   // post verify res 

  const navigate = useNavigate()  //hook for redirecting


 

  const submitValidation = (e) => {
    e.preventDefault()
    try {
      
      apiService.post('/user/forgotPwd', profile) //link where we POST detail
        .then(res => {
          
          if ((typeof res.data) === 'string'){   //json small string
           
            setResponse(res.data)
           
          }


          if ((typeof res.data) === 'object'){   //json small string
          
           setResOtp(res.data.otp)
          
         }
         
         
        }).catch(error => { console.log('Error in Fetch: ', error) })


    } catch (error) {
      console.log('Error in login post: ', error)
    }
  }



 const verifyOtpHandler = (e) => {
  e.preventDefault()
  try {
   
    apiService.post('/user/verifyOTP', profile) //link where we POST detail
      .then(res => {
        
        if ((typeof res.data) === 'string'){   //json small string
         
          setOtpResponse(res.data)
         
        }


        if ((typeof res.data) === 'object'){   //json small string
        navigate('/login')
       }
       
       
      }).catch(error => { console.log('Error in Fetch: ', error) })


  } catch (error) {
    console.log('Error in login post: ', error)
  }
}



  return (


    <>
    {(!resOtp)?(
     <>
      <div className="w-full min-h-screen bg-gray-50 flex flex-col sm:justify-center items-center pt-6 sm:pt-0 text-emerald-600">

      (<h2 className="mb-12 text-center text-3xl font-extrabold text-emerald-600">{ response? response : 'Forgot Password'}</h2>)
      

        <div className="w-full text-10lg sm:max-w-md p-5 mx-auto">
          <form action="POST">

            <div className="mb-4">
              <label className="block mb-1" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                className="py-2 px-3 bg-emerald-50 border border-emerald-600 focus:border-emerald-600 focus:outline-none focus:ring focus:ring-emerald-600 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
                value={profile.name} onChange={handler}
              />
            </div>
         
        
            <div className="mt-6">
              <button type="submit" value="Submit" onClick={submitValidation} className="w-full inline-flex items-center justify-center px-4 py-2 bg-emerald-300 border border-transparent rounded-md font-semibold capitalize text-white text-xl hover:bg-emerald-600 active:bg-emerald-600 focus:outline-none focus:border-emerald-600 focus:ring focus:ring-emerald-600 disabled:opacity-25 transition">
                Send OTP
              </button>
            </div>


            <div className="mt-6 text-center text-emerald-900">          
            
            <Link to="/login" className="underline text-lg">
            Login
            </Link>

             
            </div>
          </form>
        </div>
      </div>
      </>):(<>
      
       <div className="w-full min-h-screen bg-gray-50 flex flex-col sm:justify-center items-center pt-6 sm:pt-0 text-emerald-600">

(<h2 className="mb-12 text-center text-3xl font-extrabold text-emerald-600">{ otpResponse? otpResponse : 'OTP'}</h2>)


  <div className="w-full text-10lg sm:max-w-md p-5 mx-auto">
    <form action="POST">


   
      <div className="mb-4">
        <label className="block mb-1" htmlFor="otp">
          OTP Code
        </label>
        <input
          id="otp"
          type="number"
          name="otp"
          className="py-2 px-3 bg-emerald-50 border border-emerald-600 focus:border-emerald-600 focus:outline-none focus:ring focus:ring-emerald-600 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
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
              className="py-2 px-3  bg-emerald-50 border border-emerald-600 focus:border-emerald-600 focus:outline-none focus:ring focus:ring-emerald-600 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
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
              className="py-2 px-3  bg-emerald-50 border border-emerald-600 focus:border-emerald-600 focus:outline-none focus:ring focus:ring-emerald-600 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
              value={profile.name} onChange={handler} 
            />
          </div>

  
      <div className="mt-6">
        <button type="submit" value="Submit" onClick={verifyOtpHandler} className="w-full inline-flex items-center justify-center px-4 py-2 bg-emerald-300 border border-transparent rounded-md font-semibold capitalize text-white text-xl hover:bg-emerald-600 active:bg-emerald-600 focus:outline-none focus:border-emerald-600 focus:ring focus:ring-emerald-600 disabled:opacity-25 transition">
          Verify OTP
        </button>
      </div>


      <div className="mt-6 text-center text-emerald-900">          
      
      <Link to="/login" className="underline text-lg">
      Login
      </Link>

       
      </div>
    </form>
  </div>
</div>






      
      
      </>)
      
      
      
      
      
      
      
      
      }





    </>



  )

}

export default ForgotPwd;
