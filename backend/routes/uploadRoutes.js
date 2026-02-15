import express from "express";
import multer from "multer";
import pdfParse from "pdf-parse";
import Document from "../models/Document.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single("file"), async (req, res) => {
  try {
    const data = await pdfParse(req.file.buffer);

    const text = data.text;

    await Document.create({ text });

    res.json({ message: "File uploaded & stored" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Upload failed" });
  }
});

export default router;