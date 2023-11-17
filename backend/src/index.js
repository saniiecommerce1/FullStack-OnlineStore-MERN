import express from "express";
import connectDB from './db/connectionMongo.js'    //mesg on dev connected/or not with MongoDB
import userRoutes from './routers/userRoutes.js'  //.js must in es6
import productRoutes from './routers/productRoutes.js'  
import orderRoutes from './routers/orderRoutes.js'  
import cartRoutes from './routers/cartRoutes.js'  
import cors from 'cors'



// import bodyParser from "body-parser";

//for .env file
import dotenv from 'dotenv'
dotenv.config()









const app = express()
const port = process.env.PORT || 3000  //deployment time auto port pick
const hostName = 'localhost'



//below two codes for Post error null
app.use(express.json())  //OR app.use(bodyParser.json())
// app.use(express.urlencoded({ extended : true}))
//express has builtin own bodyparser implementation so dont need to use bodyparser package

app.use(cors({
  origin: process.env.CLIENT_URL,
  methods:'GET, POST, PUT, DELETE',
  allowedHeaders:['Content-type', 'Authorization' ]
}))


//http://localhost:4000/src/productPic/images/1699560242619%20vege.jpg to access on the browser and get image then we need below syntax so we can retreive the image in FE from BE
//app.use: path and express.static name of folder. path and name diff so given error if name 'src/productPic/images' . If both contain src/productPic/images then no error
app.use('/src/productPic', express.static('src/productPic'))



//Routes
app.use('/api/user' , userRoutes)   //'/api' is optional otherwise goto the router
app.use('/api/product' , productRoutes)   
app.use('/api/cart' , cartRoutes)   
app.use('/api/order' , orderRoutes)   

//Middleware works if route otherthan this /api/users/ like /ap, /user/ID, /apuse/name
//if route passed then error catch and end connection
//if not not found route then come below
app.use((req , res, next)=>{
  // res.status(404).send({"error": "Yes some error "})
  next(new Error("Something went wrong in route Path"))
})




// Below is error handler call by next(error)
app.use((error , req, res, next)=>{
  res.status(error.status || 500)
  res.send({message : error.message})
})




const start = async()=> {

 await connectDB(process.env.URL) 
  
 app.listen(port, hostName, () => {
    console.log('The server is running port ' + port)
  })
  
}

start()

//Note: if error come in node like 491 throw err or port is already use just
// End task VS code all in task manager
// If not solve then delete node_module folder and install npm i





