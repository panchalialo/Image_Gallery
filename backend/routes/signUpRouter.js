import { Router } from "express";
import userModel from "../mongoDb/userSchema.js";

const signUpRouter = Router();

signUpRouter.post("/signUp", async(req, res) => {
    let user = new userModel(req.body);
    console.log(user)
    try{
    let userEmail = await userModel.findOne({ email: user.email });
    if (userEmail) {
        res.status(500).json({ error: "Failed to signup" });
        res.send( { error: "Failed to signup" });
    }else{

        let signUpUser = await user.save();
        res.send( signUpUser);
    }


    }catch(err){
        console.log(err)
        res.send({ error: "Failed to signup" })
    }
    // let userEmail = await userData.findOne({ email: user.email });
    // if (userEmail) {
    //   res.status(500).json({ error: "Failed to upload file" });
    // } else {
    //   let signUpUser = await user.save();
    //   signUpUser = signUpUser.toObject();
  
    //   delete signUpUser.password;
    //   jwt.sign({ signUpUser }, jwtKey, { expiresIn: "2hr" }, (err, token) => {
    //     if (err) {
    //       res.send("something went wrong");
    //     }
    //     res.send({ signUpUser, authToken: token });
    //   });
    // }
  });


export default signUpRouter;
