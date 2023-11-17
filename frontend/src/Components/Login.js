import react, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import apiService from '../utils/apiService';
import { getTokenByResponse } from '../reduxSliceThunk/reducers/sliceGetAction'
import {useDispatch} from "react-redux"


function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [response, setResponse] = useState('')

  const navigate = useNavigate()  //hook for redirecting
  const dispatch=useDispatch()


  const emailHandler = ({ target }) => {
    setEmail(target.value)
  }

  const passwordHandler = ({ target }) => {
    setPassword(target.value)
  }

  const submitValidation = async(e) => {
    e.preventDefault()
    try {
      
      apiService.post('/user/login', { email, password }) //link where we POST detail
        .then(res => {
      
          if ((typeof res.data) === 'string'){   //json small string
           
            setResponse(res.data)
          
          }

          if(res.data.token){       

          let token = res.data.token
          let isAdmin = res.data.isAdmin                 
          let userId = res.data.user                 


           dispatch(getTokenByResponse({ token: token, isAdmin: isAdmin, userId: userId  }));          
        
          (isAdmin)? navigate('/admin') : navigate('/dashboard')
        }
      



        }).catch(error => { console.log('Error in Fetch: ', error) })


    } catch (error) {
      console.log('Error in login post: ', error)
    }
  }

//in reducer used
  // dispatch({
  //   type:"getTokenByResponse",
  //   token:token,
  //   isAdmin: isAdmin
  //  });


  return (


    <>
    
      <div className="main">

      <h2 className="heading">{ response? response : 'Welcome To The BIGGEST Online Grocery Store'}</h2>
      

        <div className="w-full text-10lg sm:max-w-md p-5 mx-auto">
          <form action="POST">

            <div className="mb-4">
              <label className="block mb-1" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="text"
                name="email"
                className="field"
                value={email} onChange={emailHandler}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                className="py-2 px-3  bg-emerald-50 border border-emerald-600 focus:border-emerald-600 focus:outline-none focus:ring focus:ring-emerald-600 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
                value={password} onChange={passwordHandler}
              />
            </div>
            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember_me"
                  type="checkbox"
                  className="field"
                />
                <label
                  htmlFor="remember_me"
                  className="ml-2 block text-sm leading-5 "
                >
                  {" "}
                  Remember me{" "}
                </label>
              </div>
              <Link to="/forgotPwd" className="text-sm">
                {" "}
                Forgot your password?{" "}
              </Link>
            </div>
            <div className="mt-6">
              <button type="submit" value="Submit" onClick={submitValidation} className="btn">
                Login
              </button>
            </div>


            <div className="mt-6 text-center text-emerald-900">          
            
            <Link to="/register" className="underline text-lg">
             Register With Us
            </Link>

             
            </div>
          </form>
        </div>
      </div>
    </>



  )

}

export default Login;