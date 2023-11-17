import CartSchema from '../models/cartSchema.js'
import ProductSchema from '../models/productSchema.js'

// At starting
const postService = async(req, res)=>{
    
    //POST from frontend like this:
    // {
    //     "orderItems": [
    // {"quantity": 1, "product": "6522cf610178c79d79c85a41"},
    
    // {"quantity": 4, "product": "6522cf870178c79d79c85a43"},
    
    // {"quantity": 5, "product": "6522cfc10178c79d79c85a45"}
    // ],
    // "user": "65247475fee2b8f8cec286db"
    // }


   


    try{

    let totalPrice = 0
    
    const orderItems = req.body.orderItems.map( async orderitem =>{
      

        const product = await ProductSchema.findById(orderitem.product)
        const price = product.price * orderitem.quantity  

        orderitem.price = price

        totalPrice += price

        return orderitem   
    })

    console.log(orderItems)
    const orderItemsPromise = Promise.all(orderItems)
    console.log(orderItemsPromise)

    const orderItemsResolved = await orderItemsPromise
    console.log(orderItemsResolved)


    const data = {
        orderItems : orderItemsResolved,
        totalPrice: totalPrice,
        user: req.body.user
    }

const addCartSchema = new CartSchema(data)  //or simply req.body  


const addData = await addCartSchema.save()  //addCartSchema is promise and save in dB
return addData;
}      
catch(error){ 
res.status(404).json({ status: "cartService POST catch error",
                    message: error.message})     
        
}
}


const getAllService = async (req, res) =>{
    try{  
     
        const getCartSchemas = await CartSchema.find({}).sort({"title": 1}) //not in db sort      
        return getCartSchemas;
      
       
    } catch(error){        
        res.status(404).send({status: "cartService GETALL catch error",
                            message: error.message})       
                   
      }
}


const getServiceById = async (req, res) =>{
    try{
        console.log(req.params)  //{ id: '651ae12da3793a263391103e' }
        const getCartSchema = await CartSchema.findById({'_id' : req.params.id})       
        return getCartSchema;   
       
        //catch error when id is wrong/when not find data
    } catch(error){        
        res.status(404).send({status: "cartService GET catch error",
        message: error.message})       
      }
}


const updateService = async (req, res) =>{
    try{

        console.log(req.params)

        let totalPrice = 0
    
        const orderItems = req.body.orderItems.map( async orderitem =>{
          
    
            const product = await ProductSchema.findById(orderitem.product)
            const price = product.price * orderitem.quantity  
    
            orderitem.price = price
    
            totalPrice += price
    
            return orderitem   
        })
    
        console.log(orderItems)
        const orderItemsPromise = Promise.all(orderItems)
        console.log(orderItemsPromise)
    
        const orderItemsResolved = await orderItemsPromise
        console.log(orderItemsResolved)
    
    
        const data = {
            orderItems : orderItemsResolved,
            totalPrice: totalPrice,
            user: req.body.user
        }
          

        const updateCart = await CartSchema.findByIdAndUpdate(req.params.id, data , {new:true} )       
        return updateCart;

     
    } catch(error){        
        res.status(500).send({status: "cartService PUT catch error",
        message: error.message})  //data in server so server error used    
      //{"error": "Cast to ObjectId failed for value \"sana\" (type string) at path \"_id\" for model \"CartSchemaCartSchema\""}
}

}


const deleteService = async (req, res) =>{
try{
    const deleteData = await CartSchema.findByIdAndDelete({_id: req.params.id})       
    return deleteData;
}catch(error){
    res.status(500).send({status: "cartService PUT catch error",
    message: error.message})
}}



const cartService = {postService , getAllService, getServiceById, updateService, deleteService}
export default cartService




