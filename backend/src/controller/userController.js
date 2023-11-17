import userService from '../services/userService.js'
import UserSchema from '../models/userSchema.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

//used by admin to control user 
const postData = async(req, res)=>{
    try{
        const data = {
            userName: req.body.userName,
            email: req.body.email ,
            password: bcrypt.hashSync(req.body.password),
            confirmPassword: bcrypt.hashSync(req.body.confirmPassword),
            firstName: req.body.firstName ,
            lastName: req.body.lastName ,
            isAdmin: req.body.isAdmin ,
            profilePicture:req.body.profilePicture,
            phone:req.body.phone ,
            address:req.body.address,
            otp: req.body.otp,
            expirationOtp: req.body.expirationOtp
        }

        const addData = await userService.postService(req,res, data )
        res.status(201).send(addData)   
      


      //catch error when post data not per schema rule/    
    } catch(error){ 
        res.status(400).send({
            status: "userContoller POST catch error",
            message: error.message
        })
      }
    } 
          //201 created Server 
        //to get the response in the postman 
        // all below too working
        // res.send(addData)
        // res.status(201).json({ addData })
        // res.status(201).json({ addUserSchema })


        // res.status(400).send(error) // //send and close conection
        // res.status(400).json({ message: error.message })             
        // res.status(404).json({reason: error.message})//send in json format and close conection
        // response.write  //you can send multiple responses


const getAll = async(req, res)=>{
    try{
        
        const getAllData = await userService.getAllService(req, res)        
        res.status(200).send(getAllData)   
       
    } catch(error){        
        res.status(404).send({status: "userContoller GETAll catch error",message: error.message})       
                   
      }
    
}


const getById = async(req, res)=>{
    try{

        const getData = await userService.getServiceById(req, res)        
        res.status(200).send(getData)

    } catch(error){        
        res.status(404).send({status: "userContoller GET catch error",message: error.message})       
      }
}

const updateById = async(req, res)=>{
try{
    
    const updateData = await userService.updateService(req, res)
    res.status(201).send(updateData)
}
catch(error){
    res.status(404).send({status: "userContoller Update catch error",message: error.message})
}
    
}

const deleteById = async(req, res)=>{
    try{

    const deleteData = await userService.deleteService(req, res)
    res.status(200).send(deleteData)

       
    } catch(error){        
        res.status(404).send({status: "userContoller Delete catch error",message: error.message})    
      }
}


//User Sign-up

const registration = async(req, res)=>{
    try{

        const userexist = await UserSchema.findOne({email : req.body.email})

        if (userexist ) res.send("Email Address already registered")

        if (req.body.password !== req.body.confirmPassword) res.send("Password Mismatch")
        


        const data = {
            userName: req.body.userName,
            email: req.body.email ,
            password: bcrypt.hashSync(req.body.password),
            confirmPassword: bcrypt.hashSync(req.body.confirmPassword),
            firstName: req.body.firstName ,
            lastName: req.body.lastName ,
            isAdmin: req.body.isAdmin ,
            profilePicture:req.body.profilePicture ,
            phone:req.body.phone ,
            address:req.body.address
        }


        const addData = await userService.postService(req,res, data )
        res.status(201).send(addData)   
      


      //catch error when post data not per schema rule/    
    } catch(error){ 
        res.status(400).send({
            status: "userContoller POST catch error",
            message: error.message
        })
      }
    } 


//POST:
//{
      
// "email": "office@gmail.com",
// "password": "office111"
   
// }


const login = async (req,res) => {

    try{
    const user = await UserSchema.findOne({email: req.body.email})
    
    if(!user) {
        return res.status(201).send('The user not found on provided email');
    }

    if(user && bcrypt.compareSync(req.body.password, user.password)) {
        const token = jwt.sign(
            {
                userId: user._id                       
            } , process.env.SECRETKEY , { expiresIn: '3h' })
        
       
        res.status(200).send({user: user._id , token: token, isAdmin: user.isAdmin}) //usually token save in localStorage
    } else {
       res.status(201).send('Type again with correct password');
    }


}catch(error){
    res.send(error.message)
}
}




// reset Password

const resetPwd = async(req, res, next)=>{
    try{   
        const data = {
        email: req.body.email,        
        password: req.body.password,
        confirmPassword: req.body.confirmPassword
    }
    const user = await UserSchema.findOne({email: req.body.email}) 

    user.password = bcrypt.hashSync(req.body.password)
    user.confirmPassword = bcrypt.hashSync(req.body.confirmPassword)     
               

     const userResetPwd = await user.save()        
     res.status(400).send(userResetPwd)    

    }catch(error){
        res.status(400).send({status: "ResetPwd Method Catch Error",
        message: error.message})
    }

}


// forget Password nodemailer and express
const forgetPwd = async(req, res, next)=>{


try{   
const data = {
    email: req.body.email
}
const user = await UserSchema.findOne(data) 
 if (!user) res.status(201).send("This email is not registered")

const transporter = nodemailer.createTransport({
service: 'gmail', 
auth: {

    user : 'sanii.ecommerce@gmail.com' ,   
    pass: 'pebb yjua bnnl pilq'
}
})

const randomOTP = Math.floor(Math.random()*1000)

const mailOptions = {
    from: 'sanii.ecommerce@gmail.com',
    to: data.email,
    subject: 'OTP Code',
    text: `Your OTP code is ${randomOTP}`
  };

  transporter.sendMail(mailOptions, async(error, info) => {
    if (error) {
      return res.status(500).send(error.message);
    }
    console.log(info.response)
   
    user.otp = randomOTP
    user.expirationOtp = Math.floor(Date.now() / 1000) *60 *60 //after an hr expire
    const userOtp = await user.save()
   
    res.status(201).send(userOtp);
});
}catch(error){

res.status(400).send({status: "Forget Method Catch Error",
    message: error.message})
}
}



// verifyOTP
const verifyOtp = async(req, res, next)=>{

    try{
        console.log(req.body.otp)
        const data = {
            email: req.body.email,
            otp : req.body.otp,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword

        }
        const user = await UserSchema.findOne({email: req.body.email}) 
        console.log(user)
        const timeStamp = Math.floor(Date.now() / 1000)

        if (!user) res.send("User not found on this email")

        console.log(typeof req.body.otp ) //string
        console.log(typeof user.otp )    //number

        if (req.body.otp != user.otp) res.send("OTP is not matched")
        // if (req.body.password !== req.body.confirmPassword) res.send("Password and Confirm Password Not Matched")
        if ( timeStamp >= user.expirationOtp) res.send("OTP is Expired, goto forget password Page")
       
        // user.password = bcrypt.hashSync(req.body.password)
        // user.confirmPassword = bcrypt.hashSync(req.body.confirmPassword)       

       
         user.otp = undefined
         user.expirationOtp = undefined       

         const userVerifiedOtp = await user.save()        
         res.status(201).send(userVerifiedOtp)       
       

     }catch(error){
        res.status(400).send({status: "VerifyOTP Method Catch Error",
                              message: error.message})
     }
}

const usersController = { postData,  getAll, getById, updateById, deleteById, registration , login, resetPwd, forgetPwd, verifyOtp }

export default usersController;




// const getByName = async(req, res)=>{
//     try{
        
//         const getUserSchema = await UserSchema.find({'userName' : req.params.userName})       
//         if (getUserSchema.length === 0) res.status(200).send(`No data behind the field ${req.params.userName}`)
//         res.status(200).send(getUserSchema)   //201 created Server 
       
//     } catch(error){        
//         res.status(400).send(error)       
//       }
// }

// const updateByName = async(req, res)=>{
//     try{
//         const updateUserSchema = await UserSchema.findOneAndUpdate({'userName': req.params.userName}, req.body, {new: true}) //{new: true} to see change in postman      
//         res.status(201).send(updateUserSchema)   //201 created Server 
       
//     } catch(error){        
//         res.status(500).send(error)  //data in server so server error used    
//       }
// }


// //hotmail nodemailer but error coming Missing credentials Login
// const transporter = nodemailer.createTransport({
//     host: 'smtp-mail.outlook.com',
//     port: 587,
//     secure: false, 
//     auth: {
//         user: 'sanii.ehsan@hotmail.com' ,   
//         pass: 'vvshlsijwascbacn' 
//         // pass:'DS32W-ZSUF4-9BZX6-6LEV5-LDEAU' //You only need to create an app password if you have two-step verification turned on and are using an app that doesn't support it.
//     },
//     requireTLS: true
//     })
