//copy data from JSON into DB 
//copy data from .js into DB 

import connectDB from './src/db/connectionMongo.js'
import InfoSchema from './src/models/informationSchema.js'

import dataJSON from './users.json' assert {type: 'json'}   //API data in JSON
import users from './users.js'


const start = async(url)=>{
    try{
    await connectDB(url)
   
    // await InfoSchema.create(users)
    await InfoSchema.create(dataJSON)

    console.log("Success")
    }catch(error){
        console.log("Error when JSON file added", error)
    }

}



start(process.env.URL)