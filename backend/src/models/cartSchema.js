import mongoose from "mongoose"

const cartSchemaModel = new mongoose.Schema({
   orderItems : [
      {
    quantity : {type: Number, required: true, min: 1, max:5},
    product: {type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
   },

   price: {type: Number}}
   ],
   
   user:  {type: mongoose.Schema.Types.ObjectId,
      ref: "User"}, 

   totalPrice: {type: Number}
    
})

const CartSchema = new mongoose.model("Cart" , cartSchemaModel)

export default CartSchema;