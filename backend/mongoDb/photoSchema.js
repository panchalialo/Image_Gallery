import mongoose from "mongoose";

export const photoSchema = new mongoose.Schema({
    title:{
        type: String,
        required : true
    },
    image:{
        type: String,
        required : true
    },
    name:{
        type: String,
        required: true
    },
    imageName:{
        type: String,
        required: true
    }
},
{timestamps: true}
)


 const photoModel = mongoose.model("posts", photoSchema)
 export default photoModel