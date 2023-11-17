import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import {useSelector} from "react-redux";

function Protected ({Component}){

  const navigate = useNavigate()

  const token = useSelector((state) => state.product.token);



  // const {token}=useSelector(state=>state.getToken)
  
  // let token = localStorage.getItem('token')
  
useEffect(()=>{

if(!token){

  navigate('/login')  
}

}, [token])

return(
    <>
    <Component/>
    </>
  )
}

export default Protected;


