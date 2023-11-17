
//verify gnerated token at login time and protect our route with using below middle ware function

import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()



const validateToken = (req, res, next)=>{
let token;
let authHeaders = req.headers.Authorization || req.headers.authorization
if (authHeaders && authHeaders.startsWith("Bearer")){

  const token = authHeaders.split(" ")[1]
  jwt.verify( token , process.env.SECRETKEY, (error, decoded)=>{
    if (error) {res.status(400).send({status : "No Token Validation", message: error.message})}
  else {
    
    console.log(decoded)
    req.userId = decoded.userId  //decoding info from token as provided at creation time token 
    console.log(req.userId)
    next()
  }
})
 
}

else{
  res.send({message: "Authorization token is missing"})
}

}

export default validateToken