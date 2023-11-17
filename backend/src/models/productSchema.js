import mongoose from "mongoose"

const productSchemaModel = new mongoose.Schema({
    title:{type: String, trim: true, unique:true, required: true },
    description: {type: String, trim: true},  
    productPicture:{type: String},
    price:{type: Number},
    category: {type: String}
    
    
})

const ProductSchema = new mongoose.model("Product" , productSchemaModel)

export default ProductSchema;