import express from "express";
import multer from "multer";
import { processImage } from "./gemini.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/translate", upload.single("image"), async (req, res) => {
  try {
    const result = await processImage(req.file);
    res.json({ result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to process image" });
  }
});

export default router;