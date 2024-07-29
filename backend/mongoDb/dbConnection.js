import mongoose from "mongoose";

const dbConnection = (url) =>{
   const dbConnect =  mongoose.connect(url)
   if(dbConnect){
    console.log("Connected with MongoDB")
   }else{
    console.log("Failed to Connect with MongoDB")
   }
}

export default dbConnection