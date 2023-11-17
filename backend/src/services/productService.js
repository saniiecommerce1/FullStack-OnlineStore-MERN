import ProductSchema from '../models/productSchema.js'




const postService = async(req, res, data)=>{

try{

const addProductSchema = new ProductSchema(data)  //or simply req.body  
const addData = await addProductSchema.save()  //addProductSchema is promise and save in dB
return addData;
}      
catch(error){ 
res.status(404).json({ status: "productService POST catch error",
                    message: error.message})     
        
}
}


const getAllService = async (req, res) =>{
    try{  
     
        const getProductSchemas = await ProductSchema.find({}).sort({"title": 1}) //not in db sort      
        return getProductSchemas;
      
       
    } catch(error){        
        res.status(404).send({status: "productService GETALL catch error",
                            message: error.message})       
                   
      }
}


const getServiceById = async (req, res) =>{
    try{
        console.log(req.params)  //{ id: '651ae12da3793a263391103e' }
        const getProductSchema = await ProductSchema.findById({'_id' : req.params.id})       
        return getProductSchema;   
       
        //catch error when id is wrong/when not find data
    } catch(error){        
        res.status(404).send({status: "productService GET catch error",
        message: error.message})       
      }
}


const updateService = async (req, res) =>{
    try{
        console.log(req.params)  //check by giving ID and otherthan ID like sana(error catch)
        const updateProductSchema = await ProductSchema.findByIdAndUpdate(req.params.id, req.body, {new:true} )      
        return updateProductSchema;   //.findById(Id).populate('product' , 'price')  //only want price field 
       

     
    } catch(error){        
        res.status(500).send({status: "productService PUT catch error",
        message: error.message})  //data in server so server error used    
      //{"error": "Cast to ObjectId failed for value \"sana\" (type string) at path \"_id\" for model \"ProductSchemaProductSchema\""}
}

}
const deleteService = async (req, res) =>{
try{
    const deleteData = await ProductSchema.findByIdAndDelete({_id: req.params.id})       
    return deleteData;
}catch(error){
    res.status(500).send({status: "productService PUT catch error",
    message: error.message})
}}



const productService = {postService , getAllService, getServiceById, updateService, deleteService}
export default productService
