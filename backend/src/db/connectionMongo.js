
import mongoose from 'mongoose'


//Connection Error on local Host//
const connectDB = (url) => {
return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{console.log("Connection Established with MongoDB Successfully")}).catch((err)=>{console.log(err)})
} 

export default connectDB;


/* 
mongoose.connect('link')

mongoose.connection.on("connected", ()=>{
    console.log("Database Connected")
})
*/


