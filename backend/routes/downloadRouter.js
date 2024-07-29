import path from "path";
import { fileURLToPath } from "url";
import { Router } from "express";

import photoModel from "../mongoDb/photoSchema.js";

const downloadRouter = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

downloadRouter.get("/download/:id", async (req, res) => {
  const { id } = req.params;
  const item = await photoModel.findById(id);
  if (!item) {
    return next(new Error("No item found"));
  }
  const file = item.imageName;
  console.log(file)
  const filePath = path.join(__dirname, `../public/uploads/${file}`);
  res.download(filePath);
});

export default downloadRouter;
