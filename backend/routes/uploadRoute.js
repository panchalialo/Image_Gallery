import { Router } from "express";
import path from "path";
import { fileURLToPath } from "url";
import uploadMiddleWare from "../middleware/multerMiddleware/multerMiddleware.js";
import photoModel from "../mongoDb/photoSchema.js";

const uploadRouter = Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

uploadRouter.get("/get", async (req, res) => {
  let products = await photoModel.find();
  if (products.length > 0) {
    res.json(products);
  } else {
    res.send("No product found");
  }
});

uploadRouter.post("/upload", uploadMiddleWare.single("image"), async (req, res) => {
  const { name, title } = req.body;
  const newPhotoData = new photoModel({
    image: `http://localhost:8080/uploads/${req.file.filename}`,
    name,
    title,
    imageName:req.file.filename
  });
  if (newPhotoData) {
    try {
      await newPhotoData.save();
      
      res.send({ message: "File uploaded successfully" });
    } catch (err) {
      res.status(500).json({ error: "Failed to upload file" });
    }
  } else {
    res.status(500).json({ error: "Failed to upload file" });
  }
});



export default uploadRouter;
