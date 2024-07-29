import mongoose from "mongoose";

export const googleUserSchema = new mongoose.Schema({

    email:{
        type: String,
        required : true
    },
    
    name:{
        type: String,
        required: true
    },
   
    photo:{
        type:String, 
    },
    googleId:{
        type:String, 
        required: true
    }
    
    

},
{timestamps: true}
)


 const googleUserModel = mongoose.model("googleUsers", googleUserSchema)
 export default googleUserModel