
import cartService from '../services/cartService.js'


const postData = async(req, res)=>{
    try{
       
        const addData = await cartService.postService(req,res)
        res.status(201).send(addData)         


      //catch error when post data not per schema rule/    
    } catch(error){ 
        res.status(400).send({
            status: "cartContoller POST catch error",
            message: error.message
        })
        
    } 
       
}
const getAll = async(req, res)=>{
    try{
        
        const getAllData = await cartService.getAllService(req, res)        
        res.status(200).send(getAllData)   
       
    } catch(error){        
        res.status(404).send({status: "cartContoller GETAll catch error",message: error.message})       
                   
      }
    
}


const getById = async(req, res)=>{
    try{

        const getData = await cartService.getServiceById(req, res)        
        res.status(200).send(getData)

    } catch(error){        
        res.status(404).send({status: "cartContoller GET catch error",message: error.message})       
      }
}

const updateById = async(req, res)=>{
    try{
    
        const updateData = await cartService.updateService(req, res)
        res.status(201).send(updateData)
    }
    catch(error){
        res.status(404).send({status: "cartContoller Update catch error",message: error.message})
    }
}

const deleteById = async(req, res)=>{
    try{

        const deleteData = await cartService.deleteService(req, res)
        res.status(200).send(deleteData)
    
           
        } catch(error){        
            res.status(404).send({status: "cartContoller Delete catch error",message: error.message})    
          }
}

const cartController = { postData, getAll, getById, updateById, deleteById}
export default cartController;



