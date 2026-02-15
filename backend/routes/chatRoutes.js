import express from "express";
import Chunk from "../models/Chunk.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { question } = req.body;

    const results = await Chunk.find({
      text: { $regex: question, $options: "i" },
    }).limit(5);

    const answer = results.map(r => r.text).join("\n");

    res.json({ answer: answer || "No answer found" });

  } catch (err) {
    res.status(500).json({ error: "Chat error" });
  }
});

export default router;