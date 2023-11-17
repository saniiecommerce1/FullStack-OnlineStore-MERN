import mongoose from "mongoose"

const userSchemaModel = new mongoose.Schema({
    email: {type: String, trim: true, required: true},
    password: {type: String},
    confirmPassword: {type: String},
    firstName: {type: String},
    lastName: {type: String},
    userName:{type: String},
    isAdmin: {type: Boolean, default: false},
    profilePicture:{type: String},
    phone:{type: Number},
    address:{ type: String},
    otp: {type: Number, default: undefined},  //not show as field but when assign value become visibl
    expirationOtp: {type: Number, default: undefined}   
    
})


//creating collection with capital start InfoUserSchema save in capital like InfoSchema
//when post a collection auto create with name "infouserschema"
const UserSchema = new mongoose.model("User" , userSchemaModel)

export default UserSchema;