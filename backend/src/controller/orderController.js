
import orderService from '../services/orderService.js'


const postData = async(req, res)=>{
    try{
       
        const addData = await orderService.postService(req,res)
        res.status(201).send(addData)   
      


      //catch error when post data not per schema rule/    
    } catch(error){ 
        res.status(400).send({
            status: "orderContoller POST catch error",
            message: error.message
        })
        
    } 
       
}
const getAll = async(req, res)=>{
    try{
        
        const getAllData = await orderService.getAllService(req, res)        
        res.status(200).send(getAllData)   
       
    } catch(error){        
        res.status(404).send({status: "orderContoller GETAll catch error",message: error.message})       
                   
      }
    
}


const getById = async(req, res)=>{
    try{

        const getData = await orderService.getServiceById(req, res)        
        res.status(200).send(getData)

    } catch(error){        
        res.status(404).send({status: "orderContoller GET catch error",message: error.message})       
      }
}

const updateById = async(req, res)=>{
    try{
    
        const updateData = await orderService.updateService(req, res)
        res.status(201).send(updateData)
    }
    catch(error){
        res.status(404).send({status: "orderContoller Update catch error",message: error.message})
    }
}

const deleteById = async(req, res)=>{
    try{

        const deleteData = await orderService.deleteService(req, res)
        res.status(200).send(deleteData)
    
           
        } catch(error){        
            res.status(404).send({status: "orderContoller Delete catch error",message: error.message})    
          }
}

const orderController = { postData, getAll, getById, updateById, deleteById}
export default orderController;



