import express from "express";
import multer from "multer";
import fs from "fs";
import pdf from "pdf-parse-fork";
import Chunk from "../models/Chunk.js";

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const buffer = fs.readFileSync(req.file.path);

    const data = await pdf(buffer); 

    const text = data.text;

    const chunks = text
      .split("\n")
      .map(t => t.trim())
      .filter(t => t.length > 0);

    for (let chunk of chunks) {
      await Chunk.create({ text: chunk });
    }

    fs.unlinkSync(req.file.path);

    res.json({ message: "Upload successful" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Upload failed" });
  }
});

export default router;