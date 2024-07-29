import { Router } from "express";

import photoModel from "../mongoDb/photoSchema.js";

const searchRouter = Router();

//Search Photo
searchRouter.get("/search/:key", async (req, res) => {
    let result = await photoModel.find({
      $or: [
        { name: { $regex: req.params.key, $options:'i' } },
        { title: { $regex: req.params.key, $options:'i' } },
      ],
    });
  
    res.send(result);
  });
  
  export default searchRouter