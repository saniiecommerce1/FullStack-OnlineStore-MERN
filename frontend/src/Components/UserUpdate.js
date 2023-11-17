import react, { useState, useEffect } from 'react'
import { Link, useNavigate} from 'react-router-dom';
import apiService from '../utils/apiService';

function UserUpdate() {
  const [userUpdate, setUserUpdate] = useState({})
  const [id, setId] = useState('')
  const [response, setResponse] = useState('')

  const navigate = useNavigate()

  const handler = ({ target }) => {
   if (target.name == "isAdmin"){
    let name = target.name
    let value = Boolean(target.value)
 
    setUserUpdate((prev)=>({...prev, [name]: value}))
    return;
   }

    let name = target.name
    let value = target.value

    setUserUpdate((prev)=>({...prev, [name]: value}))
  }



  const submitValidation = async (e) => {
    e.preventDefault()

    try {
      let res = await apiService.put(`/user/${id}`, userUpdate) //link where we 
   
     if(res.data){
      setResponse('User is Updated')
          }
    
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <> 
     

    <div className="main">

    <h2 className="heading">{ response? response : 'User Update'}</h2>

      <div className="w-full text-10lg sm:max-w-md p-3 mx-auto">
        <form>

        <div className="mb-4">
            <label  className="block mb-[0.5]" htmlFor="userId">
             UserId
            </label>
            <input
              id="userId"
              type="text"
              name="userId"             
              className="field"
              value={id} onChange={({target})=>setId(target.value)}  
            />
          </div>








        <div className="mb-4">
            <label  className="block mb-[0.5]" htmlFor="isAdmin">
             isAdmin
            </label>
            <input
              id="isAdmin"
              type="text"
              name="isAdmin"             
              className="field"
              value={userUpdate.name} onChange={handler}  
            />
          </div>

         


        <div className="mb-4">
            <label  className="block mb-[0.5]" htmlFor="firstName">
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              name="firstName"             
              className="field"
              value={userUpdate.name} onChange={handler}  
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
              value={userUpdate.name} onChange={handler} 
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
              value={userUpdate.name} onChange={handler}
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
              value={userUpdate.name} onChange={handler} 
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
              value={userUpdate.name} onChange={handler} 
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
              value={userUpdate.name} onChange={handler} 
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
              value={userUpdate.name} onChange={handler}
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
              value={userUpdate.name} onChange={handler}
            />
          </div>
       
          <div className="mt-6">
            <button type="submit" value="Submit" onClick={submitValidation} className="btn">
              Update User
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

export default UserUpdate;