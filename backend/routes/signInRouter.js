import { Router } from "express";
import userModel from "../mongoDb/userSchema.js";

const signInRouter = Router();

//login
signInRouter.post("/signIn", async (req, res) => {
    if (req.body.password && req.body.email) {
      let user = await userModel.findOne({ email: req.body.email, password1: req.body.password });
      if (user) {
       
          res.send(user);
        
      } else {
        res.status(500).json({ error: "Failed to upload file" });
      }
    } else {
      res.status(500).json({ error: "Failed to upload file" });
    }
  });


export default signInRouter;
