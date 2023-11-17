import OrderSchema from '../models/orderSchema.js'
import CartSchema from '../models/cartSchema.js'


const postService = async(req, res)=>{

try{

   const data = {
        cart: req.body.cart,
        user: req.body.user, 
        dateCreated: req.body.dateCreated,
        shippingAddress: req.body.shippingAddress,
        contact: req.body.contact,
        country: req.body.country,
        orderStatus: req.body.orderStatus,
        
    }

    // {
    //     "cart": "6522f5189437dd2419f2b9d5",
    //     "user": "65227ffb4bb358b6d0c62e08", 
    //     "shippingAddress": "15-B",
    //     "contact": 1234567,
    //     "country": "Pakistan",
    //     "orderStatus": "Pending"
    // }

const addOrderSchema = new OrderSchema(data)  //or simply req.body  


const addData = await addOrderSchema.save()  //addOrderSchema is promise and save in dB
return addData;
}      
catch(error){ 
res.status(404).json({ status: "orderService POST catch error",
                    message: error.message})     
        
}
}


const getAllService = async (req, res) =>{
    try{  
     
        const getOrderSchemas = await OrderSchema.find({}).sort({"orderStatus": 1})    //not in db sort      
        return getOrderSchemas;
      
       
    } catch(error){        
        res.status(404).send({status: "orderService GETALL catch error",
                            message: error.message})       
                   
      }
}


const getServiceById = async (req, res) =>{
    try{
        console.log(req.params)  //{ id: '651ae12da3793a263391103e' }
        const getOrderSchema = await OrderSchema.findById({'_id' : req.params.id})
        .populate('user', 'firstName')
        .populate({path: 'cart', populate: {path: 'orderItems', populate:'product'  }})
        return getOrderSchema;   
              
        // .populate({path: 'cart', populate: 'orderItems'})

       
        //catch error when id is wrong/when not find data
    } catch(error){        
        res.status(404).send({status: "orderService GET catch error",
        message: error.message})       
      }
}

//PUT
// {      "shippingAddress": "15-B/C" }

const updateService = async (req, res) =>{
    try{
        // console.log(req.params)  //check by giving ID and otherthan ID like sana(error catch)
        const updateOrderSchema = await OrderSchema.findByIdAndUpdate(req.params.id, req.body, {new:true} )       
        return updateOrderSchema;
       

     
    } catch(error){        
        res.status(500).send({status: "orderService PUT catch error",
        message: error.message})  //data in server so server error used    
      //{"error": "Cast to ObjectId failed for value \"sana\" (type string) at path \"_id\" for model \"OrderSchemaOrderSchema\""}
}

}

//delete order only delete order not cart 
//So 

const deleteService = async (req, res) =>{
try{

    const deleteData = await OrderSchema.findByIdAndDelete({_id: req.params.id}) 
        
        const cartId = deleteData.cart    

        await CartSchema.findByIdAndDelete(cartId)

        return deleteData;

}catch(error){
    res.status(500).send({status: "orderService PUT catch error",
    message: error.message})
}}



const orderService = {postService , getAllService, getServiceById, updateService, deleteService}
export default orderService
