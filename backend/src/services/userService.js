import UserSchema from '../models/userSchema.js'

const postService = async(req, res, data)=>{

try{

const addUserSchema = new UserSchema(data)  //or simply req.body  
const addData = await addUserSchema.save()  //addUserSchema is promise and save in dB
return addData;
}      
catch(error){ 
res.status(404).json({ status: "userService POST catch error",
                    message: error.message})     
        
}
}


const getAllService = async (req, res) =>{
    try{
        const getUserSchemas = await UserSchema.find({}).sort({"userName": 1}) //not in db sort      
        return getUserSchemas;
      
       
    } catch(error){        
        res.status(404).send({status: "userService GETALL catch error",
                            message: error.message})       
                   
      }
}


const getServiceById = async (req, res) =>{
    try{
        console.log(req.params)  //{ id: '651ae12da3793a263391103e' }
        const getUserSchema = await UserSchema.findById({'_id' : req.params.id})       
        return getUserSchema;   
       
        //catch error when id is wrong/when not find data
    } catch(error){        
        res.status(404).send({status: "userService GET catch error",
        message: error.message})       
      }
}


const updateService = async (req, res) =>{
    try{
        console.log(req.params)  //check by giving ID and otherthan ID like sana(error catch)
        const updateUserSchema = await UserSchema.findByIdAndUpdate(req.params.id, req.body, {new:true} )       
        return updateUserSchema;
       

     
    } catch(error){        
        res.status(500).send({status: "userService PUT catch error",
        message: error.message})  //data in server so server error used    
      //{"error": "Cast to ObjectId failed for value \"sana\" (type string) at path \"_id\" for model \"UserSchemaUserSchema\""}
}

}
const deleteService = async (req, res) =>{
try{
    const deleteUserSchema = await UserSchema.findByIdAndDelete(req.params.id)       
    return deleteUserSchema;
}catch(error){
    res.status(500).send({status: "userService PUT catch error",
    message: error.message})
}}



const userService = {postService , getAllService, getServiceById, updateService, deleteService}
export default userService
