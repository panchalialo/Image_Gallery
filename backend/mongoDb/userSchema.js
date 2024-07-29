import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required : true
    },
    
    name:{
        type: String,
        required: true
    },
    password1:{
        type: String,
        required: true
    },
    password2:{
        type: String,
        required: true
    },
    googleId:{
        type:String,
    },
    profilePhoto:{
        type:String, 
    }

},
{timestamps: true}
)


 const userModel = mongoose.model("users", userSchema)
 export default userModel