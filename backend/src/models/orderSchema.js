import mongoose from "mongoose"

const orderSchemaModel = new mongoose.Schema({

cart: {type: mongoose.Schema.Types.ObjectId,
            ref: "Cart"},

user:  {type: mongoose.Schema.Types.ObjectId,
    ref: "User"},   
    

dateCreated: {type: Date, default: Date.now},

shippingAddress: {type: String},

contact: {type: Number},

country: {type: String},

orderStatus: {type: String, default: "Pending"}
    
})

const OrderSchema = new mongoose.model("Order" , orderSchemaModel)

export default OrderSchema;